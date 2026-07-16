import { organizationSchema } from "@/lib/seo/organization";
import { websiteSchema } from "@/lib/seo/website";

export default function StructuredData() {
  const schema = [
    organizationSchema,
    websiteSchema,
  ];

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