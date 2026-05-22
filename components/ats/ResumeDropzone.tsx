"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Upload } from "lucide-react";

import { RESUME_ACCEPT } from "@/lib/careersApplication";

const MAX_MB = 5;

type ResumeDropzoneProps = {
  file: File | null;
  onFile: (file: File | null) => void;
  error?: string;
};

export default function ResumeDropzone({ file, onFile, error }: ResumeDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const f = files?.[0];
      if (!f) return;
      if (f.size > MAX_MB * 1024 * 1024) {
        onFile(null);
        return;
      }
      onFile(f);
    },
    [onFile],
  );

  return (
    <div>
      <motion.label
        animate={{ scale: dragOver ? 1.01 : 1 }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition ${
          dragOver
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
            : "border-indigo-200 bg-[#f8fafc] hover:border-indigo-400 dark:border-indigo-500/30 dark:bg-indigo-500/5"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        {file ? (
          <FileUp className="size-10 text-indigo-600" aria-hidden />
        ) : (
          <Upload className="size-10 text-indigo-500" aria-hidden />
        )}
        <span className="mt-3 text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">
          {file ? file.name : "Drag & drop resume here"}
        </span>
        <span className="mt-1 text-xs text-[#94a3b8]">PDF, DOC, DOCX · max {MAX_MB} MB</span>
        <span className="mt-3 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white">Browse files</span>
        <input
          type="file"
          accept={RESUME_ACCEPT}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.label>
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
