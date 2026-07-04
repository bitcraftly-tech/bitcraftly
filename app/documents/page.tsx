import { redirect } from "next/navigation";

/** Convenience redirect — document management lives in the authenticated dashboard. */
export default function DocumentsRedirectPage() {
  redirect("/dashboard/documents");
}
