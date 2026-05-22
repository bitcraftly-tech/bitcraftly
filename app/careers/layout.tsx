import { ReactNode } from "react";

import QueryProvider from "@/components/providers/QueryProvider";

export default function CareersLayout({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
