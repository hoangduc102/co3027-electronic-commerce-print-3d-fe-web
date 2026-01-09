import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: "Liên Hệ",
  description:
    "Liên hệ Print3D.vn để được tư vấn dịch vụ in 3D. Hotline: 1900 xxxx. Email: support@print3d.vn. Địa chỉ: 123 Nguyễn Văn Linh, Quận 7, TP.HCM.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
