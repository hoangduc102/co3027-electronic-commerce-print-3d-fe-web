import type { Metadata } from "next";
import { generatePageMetadata, pagesSEO } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: pagesSEO.support.title,
  description: pagesSEO.support.description,
  path: "/support",
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
