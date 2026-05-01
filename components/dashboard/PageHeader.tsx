import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  action?: {
    label: string;
    href?: string;
  };
};

export default function PageHeader({ title, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="border-b border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className="w-full py-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            {breadcrumbs?.length ? (
              <div className="mb-1 flex items-center gap-2 text-sm text-text-tertiary dark:text-dark-text-tertiary">
                {breadcrumbs.map((crumb, index) => (
                  <span key={`${crumb.label}-${index}`}>
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-text-secondary dark:hover:text-dark-text-secondary">
                        {crumb.label}
                      </Link>
                    ) : (
                      crumb.label
                    )}
                    {index < breadcrumbs.length - 1 ? <span className="mx-2">/</span> : null}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{title}</h1>
          </div>

          {action ? (
            action.href ? (
              <Link
                href={action.href}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {action.label}
              </Link>
            ) : (
              <button
                type="button"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {action.label}
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
