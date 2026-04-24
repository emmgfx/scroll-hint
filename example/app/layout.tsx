import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "scroll-hint — React scroll shadow indicators",
  description: "Scroll shadow indicators for React using IntersectionObserver. No scroll events, no polling, just IntersectionObserver.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
