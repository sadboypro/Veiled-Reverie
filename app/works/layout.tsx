import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A growing archive of frames — portraits, fashion, documentary and quiet conceptual studies. Each one a moment held a little longer.",
  openGraph: {
    title: "The Complete Works | Veiled Reverie",
    description: "Portraits, fashion, documentary and conceptual studies by Prosper Mayaki.",
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
