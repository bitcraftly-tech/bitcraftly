"use client";

import Link from "next/link";
import { Download, Eye } from "lucide-react";

import DocumentVisibilityBadge from "@/components/documents/DocumentVisibilityBadge";
import type { BitcraftlyDocument } from "@/types/documents";

type DocumentsGridProps = {
  documents: BitcraftlyDocument[];
  canDownload: boolean;
};

export default function DocumentsGrid({ documents, canDownload }: DocumentsGridProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-primary bg-bg-card px-6 py-12 text-center dark:border-dark-border-primary dark:bg-dark-bg-card">
        <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">No documents match your filters</p>
        <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">Try clearing search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-primary bg-bg-secondary/60 text-xs uppercase tracking-wide text-text-tertiary dark:border-dark-border-primary dark:bg-dark-bg-secondary/60 dark:text-dark-text-tertiary">
            <tr>
              <th className="px-4 py-3 font-semibold">Document</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Version</th>
              <th className="px-4 py-3 font-semibold">Visibility</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-border-primary/70 last:border-0 dark:border-dark-border-primary/70">
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">{doc.title}</p>
                  <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">{doc.documentId}</p>
                </td>
                <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">{doc.category}</td>
                <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">v{doc.version}</td>
                <td className="px-4 py-3">
                  <DocumentVisibilityBadge visibility={doc.visibility} />
                </td>
                <td className="px-4 py-3 text-text-secondary dark:text-dark-text-secondary">{doc.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/documents/${doc.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-border-primary px-2.5 py-1.5 text-xs font-medium text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                    >
                      <Eye className="size-3.5" aria-hidden />
                      View
                    </Link>
                    {canDownload ? (
                      <a
                        href={`/api/documents/${doc.id}/view?download=1`}
                        className="inline-flex items-center gap-1 rounded-lg border border-border-primary px-2.5 py-1.5 text-xs font-medium text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
                      >
                        <Download className="size-3.5" aria-hidden />
                        Download
                      </a>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border-primary md:hidden dark:divide-dark-border-primary">
        {documents.map((doc) => (
          <article key={doc.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-text-primary dark:text-dark-text-primary">{doc.title}</p>
                <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">{doc.documentId}</p>
              </div>
              <DocumentVisibilityBadge visibility={doc.visibility} />
            </div>
            <p className="mt-2 text-xs text-text-secondary dark:text-dark-text-secondary">
              {doc.category} · v{doc.version} · {doc.status}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/dashboard/documents/${doc.id}`}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border-primary px-3 py-2 text-xs font-medium dark:border-dark-border-primary"
              >
                <Eye className="size-3.5" aria-hidden />
                View
              </Link>
              {canDownload ? (
                <a
                  href={`/api/documents/${doc.id}/view?download=1`}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border-primary px-3 py-2 text-xs font-medium dark:border-dark-border-primary"
                >
                  <Download className="size-3.5" aria-hidden />
                  Download
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
