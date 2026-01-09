// JSON-LD Structured Data Components cho SEO
// Giúp search engines hiểu nội dung website tốt hơn

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  socialLinks?: string[];
}

export function OrganizationJsonLd({
  name = "Print3D.vn",
  url = "https://print3d.vn",
  logo = "https://print3d.vn/logo.svg",
  description = "Nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam",
  email = "support@print3d.vn",
  phone = "1900xxxx",
  address = {
    streetAddress: "123 Nguyễn Văn Linh",
    addressLocality: "Quận 7",
    addressRegion: "TP. Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN",
  },
  socialLinks = [],
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    sameAs: socialLinks,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  url?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "VND",
  availability = "InStock",
  sku,
  brand = "Print3D.vn",
  url,
}: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url?: string;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "Print3D.vn",
  url,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Print3D.vn",
      logo: {
        "@type": "ImageObject",
        url: "https://print3d.vn/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface LocalBusinessJsonLdProps {
  name?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  openingHours?: string[];
  priceRange?: string;
}

export function LocalBusinessJsonLd({
  name = "Print3D.vn",
  image = "https://print3d.vn/logo.svg",
  telephone = "1900xxxx",
  email = "support@print3d.vn",
  address = {
    streetAddress: "123 Nguyễn Văn Linh",
    addressLocality: "Quận 7",
    addressRegion: "TP. Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN",
  },
  openingHours = ["Mo-Fr 08:00-18:00", "Sa 08:00-12:00"],
  priceRange = "$$",
}: LocalBusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    image,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(" ");
      const [opens, closes] = time.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens,
        closes,
      };
    }),
    priceRange,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Website Schema
export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Print3D.vn",
    url: "https://print3d.vn",
    description: "Nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://print3d.vn/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
