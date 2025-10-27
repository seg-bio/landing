import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "seg.bio",
  description: "Intelligent agent for biomedical image segmentation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
