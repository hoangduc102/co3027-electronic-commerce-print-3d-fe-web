// SEO Configuration - Cấu hình metadata mặc định cho website
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://print3d.vn";

// Default SEO metadata
export const defaultSEO: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Print3D.vn - Dịch vụ In 3D Chuyên Nghiệp",
    template: "%s | Print3D.vn",
  },
  description:
    "Nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam. Báo giá tức thì, đa dạng vật liệu PLA, PETG, ABS, Resin. Giao hàng toàn quốc.",
  keywords: [
    "in 3D",
    "dịch vụ in 3D",
    "in 3D online",
    "in 3D Việt Nam",
    "print 3D",
    "PLA",
    "PETG",
    "ABS",
    "Resin",
    "FDM",
    "SLA",
    "báo giá in 3D",
    "in mô hình 3D",
    "in prototype",
    "in 3D HCM",
    "in 3D Hà Nội",
  ],
  authors: [{ name: "Print3D.vn", url: BASE_URL }],
  creator: "Print3D.vn",
  publisher: "Print3D.vn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: "Print3D.vn",
    title: "Print3D.vn - Dịch vụ In 3D Chuyên Nghiệp",
    description:
      "Nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam. Báo giá tức thì, đa dạng vật liệu.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Print3D.vn - Dịch vụ In 3D Chuyên Nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Print3D.vn - Dịch vụ In 3D Chuyên Nghiệp",
    description:
      "Nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam. Báo giá tức thì, đa dạng vật liệu.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@print3dvn",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "vi-VN": BASE_URL,
    },
  },
  verification: {
    google: "google-site-verification-code", // Thay bằng code thực
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-verification-code',
  },
  category: "technology",
};

// Helper function to generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

// Predefined metadata for common pages
export const pagesSEO = {
  home: {
    title: "Trang chủ",
    description:
      "Print3D.vn - Nền tảng dịch vụ in 3D chuyên nghiệp. Báo giá tức thì, đa dạng vật liệu PLA, PETG, ABS, Resin. Giao hàng toàn quốc trong 1-3 ngày.",
  },
  quote: {
    title: "Báo Giá In 3D Tức Thì",
    description:
      "Upload file 3D và nhận báo giá ngay lập tức. Hỗ trợ STL, OBJ, 3MF. Đa dạng vật liệu và màu sắc. Xem preview 3D trước khi đặt hàng.",
  },
  store: {
    title: "Cửa Hàng Mẫu In 3D",
    description:
      "Khám phá bộ sưu tập mẫu in 3D có sẵn. Figure, đồ decor, phụ kiện gaming, và nhiều hơn nữa. In theo yêu cầu với nhiều kích thước và màu sắc.",
  },
  materials: {
    title: "Thư Viện Vật Liệu In 3D",
    description:
      "Tìm hiểu về các loại vật liệu in 3D: PLA, PETG, ABS, TPU, Resin. So sánh đặc tính, ứng dụng và giá cả để chọn vật liệu phù hợp.",
  },
  guidelines: {
    title: "Hướng Dẫn Thiết Kế File 3D",
    description:
      "Hướng dẫn chi tiết cách thiết kế file 3D tối ưu cho in FDM và SLA. Quy tắc về wall thickness, supports, và các mẹo để có bản in chất lượng.",
  },
  showcase: {
    title: "Showcase - Dự Án Thực Tế",
    description:
      "Gallery các dự án in 3D thực tế từ khách hàng Print3D.vn. Từ prototype sản phẩm đến figure nghệ thuật và phụ tùng công nghiệp.",
  },
  blog: {
    title: "Blog & Kiến Thức In 3D",
    description:
      "Cập nhật tin tức, hướng dẫn và kiến thức về công nghệ in 3D. So sánh vật liệu, review công nghệ và case study từ đội ngũ Print3D.vn.",
  },
  about: {
    title: "Về Chúng Tôi",
    description:
      "Print3D.vn - Đội ngũ chuyên gia in 3D với hơn 5 năm kinh nghiệm. 10,000+ đơn hàng hoàn thành, 2,500+ khách hàng tin tưởng.",
  },
  contact: {
    title: "Liên Hệ",
    description:
      "Liên hệ Print3D.vn để được tư vấn dịch vụ in 3D. Hotline: 1900 xxxx. Email: support@print3d.vn. Địa chỉ: 123 Nguyễn Văn Linh, Quận 7, TP.HCM.",
  },
  support: {
    title: "Trung Tâm Hỗ Trợ",
    description:
      "Câu hỏi thường gặp về dịch vụ in 3D. Hướng dẫn đặt hàng, thanh toán, vận chuyển và chính sách bảo hành.",
  },
};
