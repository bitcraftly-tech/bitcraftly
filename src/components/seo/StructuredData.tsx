import { buildOrganizationSchema } from '@/lib/seo/organization';
import { buildWebsiteSchema } from '@/lib/seo/website';

export default function StructuredData() {
  const schema = [buildOrganizationSchema(), buildWebsiteSchema()];

  return (
    <>
      {schema.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}
