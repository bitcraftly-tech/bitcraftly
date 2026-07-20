import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[50vh] flex-col items-center justify-center px-[var(--space-4)] py-[var(--space-8)] text-center"
    >
      <h1 className="font-sans text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-[var(--space-2)] max-w-md font-sans text-sm text-muted-foreground">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-[var(--space-4)] font-sans text-sm font-semibold text-primary underline underline-offset-4"
      >
        Return home
      </Link>
    </main>
  );
}
