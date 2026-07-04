"use client";

import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

import DocumentVisibilityBadge from "@/components/documents/DocumentVisibilityBadge";
import type { BitcraftlyDocument } from "@/types/documents";

type DocumentDetailClientProps = {
  document: BitcraftlyDocument;
  canDownload: boolean;
  viewUrl: string;
};

export default function DocumentDetailClient({ document, canDownload, viewUrl }: DocumentDetailClientProps) {
  const downloadUrl = `${viewUrl}?download=1`;
  const inlineUrl = `${viewUrl}?inline=1`;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to documents
        </Link>
      </div>

      <div className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">
              {document.documentId}
            </p>
            <h1 className="mt-1 text-xl font-bold text-text-primary dark:text-dark-text-primary sm:text-2xl">
              {document.title}
            </h1>
            <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{document.description}</p>
          </div>
          <DocumentVisibilityBadge visibility={document.visibility} />
        </div>

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Category</dt>
            <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">{document.category}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Version</dt>
            <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">v{document.version}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Status</dt>
            <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">{document.status}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Classification</dt>
            <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">{document.classification}</dd>
          </div>
          {document.effectiveDate ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Effective</dt>
              <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">{document.effectiveDate}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">Owner</dt>
            <dd className="mt-1 font-medium text-text-primary dark:text-dark-text-primary">{document.owner}</dd>
          </div>
        </dl>

        {document.tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-bg-secondary px-2 py-0.5 text-xs text-text-secondary dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={inlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <ExternalLink className="size-4" aria-hidden />
            Open document
          </a>
          {canDownload ? (
            <a
              href={downloadUrl}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
            >
              <Download className="size-4" aria-hidden />
              Download
            </a>
          ) : null}
          {document.publicUrl ? (
            <a
              href={document.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-primary px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
            >
              Public copy
            </a>
          ) : null}
        </div>
      </div>

      {/* Desktop embedded preview — hidden on mobile to avoid iOS iframe/nested scroll issues */}
      <section className="hidden rounded-xl border border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card md:block">
        <div className="border-b border-border-primary px-4 py-3 dark:border-dark-border-primary">
          <h2 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Preview</h2>
        </div>
        <iframe
          title={`${document.title} preview`}
          src={inlineUrl}
          className="h-[min(72vh,900px)] w-full bg-white"
        />
      </section>

      <p className="text-xs text-text-tertiary md:hidden dark:text-dark-text-tertiary">
        On mobile, use Open document to view the PDF in your browser viewer.
      </p>
    </div>
  );
}
