import type { Metadata } from "next";
import { generatePageMetadata, pagesSEO } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: pagesSEO.store.title,
  description: pagesSEO.store.description,
  path: "/store",
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
