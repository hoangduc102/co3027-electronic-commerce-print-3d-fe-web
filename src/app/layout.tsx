import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { PromoBanner } from "@/components/home/promo-banner";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { defaultSEO } from "@/lib/seo.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <PromoBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <ChatbotWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
