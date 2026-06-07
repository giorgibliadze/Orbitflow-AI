import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrbitFlow AI — Workflows that think ahead of your team",
  description:
    "OrbitFlow is the AI-native workspace that automates the ops layer of your business. Ship faster with less friction and zero dropped balls.",
  keywords: [
    "AI workflow",
    "team automation",
    "SaaS productivity",
    "workflow management",
    "AI operations",
  ],
  authors: [{ name: "OrbitFlow AI" }],
  openGraph: {
    title: "OrbitFlow AI — Workflows that think ahead",
    description:
      "The AI-native workspace that automates the ops layer of your business.",
    type: "website",
    url: "https://orbitflow.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OrbitFlow AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrbitFlow AI",
    description: "Workflows that think ahead of your team.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}