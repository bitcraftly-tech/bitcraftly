interface AdminStatCardProps {
  label: string;
  value: string;
  hint: string;
}

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <article className="admin-stat">
      <p className="admin-stat__label">{label}</p>
      <p className="admin-stat__value">{value}</p>
      <p className="admin-stat__hint">{hint}</p>
    </article>
  );
}
