import type {
  CalculatorEstimateResult,
  CalculatorSelections,
  CostCalculatorCmsContent,
} from "./cost-calculator.types";
import { formatInr } from "./estimate-engine";

function escapePdfText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("₹", "Rs.");
}

function buildPdfContent(
  content: CostCalculatorCmsContent,
  estimate: CalculatorEstimateResult,
  selections: CalculatorSelections,
): string {
  const customer =
    content.customers.find((item) => item.id === selections.customerTypeId)
      ?.label ?? "—";
  const project =
    content.projectTypes.find((item) => item.id === selections.projectTypeId)
      ?.label ?? "—";
  const hosting =
    content.hostingOptions.find((item) => item.id === selections.hostingId)
      ?.label ?? "—";
  const maintenance =
    content.maintenanceOptions.find(
      (item) => item.id === selections.maintenanceId,
    )?.label ?? "—";
  const timeline =
    content.timelines.find((item) => item.id === selections.timelineId)
      ?.label ?? "—";
  const features =
    selections.featureIds.length > 0
      ? selections.featureIds
          .map(
            (id) =>
              content.features.find((feature) => feature.id === id)?.label,
          )
          .filter(Boolean)
          .join(", ")
      : "None";

  const lines = [
    "Bitcraftly — Project Cost Estimate",
    "--------------------------------",
    `Customer: ${customer}`,
    `Project: ${project}`,
    `Features: ${features}`,
    `Hosting: ${hosting}`,
    `Maintenance: ${maintenance}`,
    `Timeline: ${timeline}`,
    "",
    "Breakdown",
    "---------",
    ...estimate.lines.map(
      (line) => `${line.label}: ${formatInr(line.amount)}`,
    ),
    "",
    `Estimated cost: ${formatInr(estimate.estimatedTotal)}`,
    `Annual renewal: ${formatInr(estimate.annualRenewal)}`,
    `Estimated timeline: ${estimate.timelineLabel}`,
    `Suggested package: ${estimate.suggestedPackage}`,
    `Recommended stack: ${estimate.recommendedStack.join(", ") || "—"}`,
    "",
    content.calculator.disclaimer,
    "",
    "This is an indicative estimate only. Final quote after written scope.",
    "bitcraftly.com",
  ];

  return lines.map(escapePdfText).join("\n");
}

/**
 * Zero-dependency text PDF download for calculator estimates.
 */
export function downloadEstimatePdf(
  content: CostCalculatorCmsContent,
  estimate: CalculatorEstimateResult,
  selections: CalculatorSelections,
): void {
  if (!estimate.isComplete || typeof window === "undefined") return;

  const body = buildPdfContent(content, estimate, selections);
  const textLines = body.split("\n");
  const contentStream = [
    "BT",
    "/F1 11 Tf",
    "50 780 Td",
    "14 TL",
    ...textLines.flatMap((line, index) => {
      if (index === 0) {
        return [`(${line}) Tj`];
      }
      return ["T*", `(${line}) Tj`];
    }),
    "ET",
  ].join("\n");

  const objects = [
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
    "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj",
    `4 0 obj<< /Length ${contentStream.length} >>stream\n${contentStream}\nendstream\nendobj`,
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `bitcraftly-estimate-${stamp}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
