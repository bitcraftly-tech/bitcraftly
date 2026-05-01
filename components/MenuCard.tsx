export type MenuItem = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type MenuCardProps = {
  item: MenuItem;
};

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{item.name}</h3>
          <p className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-sm font-semibold text-slate-700">
            {item.price}
          </p>
        </div>
      </div>
    </article>
  );
}
