// app/layout.tsx
// Root layout — wraps every page in Next.js App Router.
// This is where global styles, fonts, and metadata live.

import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SmartTax Lite",
  description:
    "Indian Income Tax Calculator — Old vs New Regime + Expense Splitter",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
