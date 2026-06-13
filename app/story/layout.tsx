import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "Behind the veiled lens — Prosper Mayaki on light over spectacle, story over symmetry, and the patience of making photographs that reveal what is felt.",
  openGraph: {
    title: "Behind the Veiled Lens | Veiled Reverie",
    description: "The story and principles behind Veiled Reverie, by Prosper Mayaki.",
  },
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
