import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Let's create something timeless. Commission a shoot or start a conversation with Prosper Mayaki of Veiled Reverie.",
  openGraph: {
    title: "Connect | Veiled Reverie",
    description: "Let's create something timeless — get in touch with Prosper Mayaki.",
  },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
