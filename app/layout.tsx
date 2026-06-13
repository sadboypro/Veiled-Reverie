import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veiled-reverie.vercel.app";
const ogImage = "/images/a_1.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Veiled Reverie | Visual Storytelling",
    template: "%s | Veiled Reverie",
  },
  description:
    "Where moments become timeless stories. Crafting visual narratives that reveal the extraordinary within the ordinary.",
  keywords: [
    "photography",
    "visual storytelling",
    "portrait photography",
    "fashion photography",
    "documentary photography",
    "Prosper Mayaki",
    "Veiled Reverie",
  ],
  authors: [{ name: "Prosper Mayaki" }],
  creator: "Prosper Mayaki",
  openGraph: {
    type: "website",
    siteName: "Veiled Reverie",
    title: "Veiled Reverie | Visual Storytelling",
    description: "Where moments become timeless. Visual storyteller — Prosper Mayaki.",
    url: siteUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Veiled Reverie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veiled Reverie | Visual Storytelling",
    description: "Where moments become timeless. Visual storyteller — Prosper Mayaki.",
    images: [ogImage],
    creator: "@anesheprosper",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
