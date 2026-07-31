'use client';

import { useCallback, useId, useState, type DragEvent, type ChangeEvent } from 'react';
import { FileText, UploadCloud } from 'lucide-react';

import AiProcessing from '@/modules/ai/shared/components/AiProcessing';
import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import type { AiReportFinding } from '@/modules/ai/shared/types';

const FINDINGS: readonly AiReportFinding[] = [
  { label: 'Haemoglobin', value: '13.2 g/dL', status: 'Normal' },
  { label: 'WBC count', value: '11,400 /µL', status: 'Borderline' },
  { label: 'Platelets', value: '2.1 lakh/µL', status: 'Normal' },
  { label: 'CRP', value: '8.4 mg/L', status: 'Attention' },
];

export default function ReportAnalyzerDemo() {
  const uid = useId();
  const { busy, run } = useFakeAiDelay(1800);
  const [fileName, setFileName] = useState('');
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  const analyze = useCallback(
    async (name: string) => {
      setFileName(name);
      setReady(false);
      await run(() => true);
      setReady(true);
    },
    [run],
  );

  function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void analyze(file.name);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void analyze(file.name);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <label
        htmlFor={`${uid}-file`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className="cl-card flex min-h-[18rem] cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-8 text-center transition"
        style={{
          borderColor: dragging ? 'var(--cl-primary)' : 'var(--cl-border)',
          background: dragging ? 'var(--cl-surface-tint)' : 'var(--cl-surface)',
        }}
      >
        <UploadCloud className="h-10 w-10" style={{ color: 'var(--cl-primary)' }} aria-hidden />
        <span className="cl-h3">Drag &amp; drop a report</span>
        <span className="cl-small">
          CBC, MRI or X-Ray PDF / image — showcase only, nothing is uploaded.
        </span>
        <span className="cl-btn cl-btn--outline cl-btn--sm mt-2">Browse files</span>
        <input
          id={`${uid}-file`}
          type="file"
          accept=".pdf,image/*"
          className="sr-only"
          onChange={onFile}
        />
      </label>

      <section aria-live="polite">
        {busy ? <AiProcessing label="Reading report pages…" /> : null}
        {ready && !busy ? (
          <div className="cl-card space-y-5 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <FileText
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: 'var(--cl-primary)' }}
                aria-hidden
              />
              <div>
                <h2 className="cl-h3">AI summary</h2>
                <p className="cl-small mt-1">Source: {fileName || 'report.pdf'}</p>
              </div>
            </div>
            <p className="cl-body">
              Most blood markers look within expected ranges. Mildly elevated WBC and CRP can
              reflect a recovering infection — correlate with symptoms and repeat if advised.
            </p>
            <ul className="space-y-2">
              {FINDINGS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm"
                  style={{ borderColor: 'var(--cl-border)' }}
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="tabular-nums">{item.value}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{
                      background:
                        item.status === 'Normal'
                          ? '#ccfbf1'
                          : item.status === 'Borderline'
                            ? '#ffedd5'
                            : '#ffe4e6',
                      color:
                        item.status === 'Normal'
                          ? '#0f766e'
                          : item.status === 'Borderline'
                            ? '#c2410c'
                            : '#be123c',
                    }}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <h3 className="text-sm font-semibold">Recommendations</h3>
              <ul className="cl-small mt-2 list-disc space-y-1 pl-5">
                <li>Share this summary with your physician before changing medication.</li>
                <li>Repeat CRP in 5–7 days if fever or cough continues.</li>
                <li>Maintain hydration and rest while recovering.</li>
              </ul>
            </div>
          </div>
        ) : !busy ? (
          <div
            className="flex h-full min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-dashed p-8 text-center"
            style={{ borderColor: 'var(--cl-border)', color: 'var(--cl-faint)' }}
          >
            Upload a sample file to see the AI explanation card.
          </div>
        ) : null}
      </section>
    </div>
  );
}
