"use client";

import Link from "next/link";
import { useEffect } from "react";

interface AppErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[50vh] flex-col items-center justify-center px-[var(--space-4)] py-[var(--space-8)] text-center"
    >
      <h1 className="font-sans text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-[var(--space-2)] max-w-md font-sans text-sm text-muted-foreground">
        An unexpected error occurred. You can try again or return to the homepage.
      </p>
      <div className="mt-[var(--space-4)] flex flex-wrap items-center justify-center gap-[var(--space-3)]">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-[var(--token-radius-md)] bg-primary px-[var(--space-4)] py-[var(--space-2)] font-sans text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-sans text-sm font-semibold text-primary underline underline-offset-4"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
