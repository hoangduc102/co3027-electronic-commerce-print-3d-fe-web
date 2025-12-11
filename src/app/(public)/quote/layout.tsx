import type { Metadata } from "next";
import { generatePageMetadata, pagesSEO } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: pagesSEO.quote.title,
  description: pagesSEO.quote.description,
  path: "/quote",
});

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
