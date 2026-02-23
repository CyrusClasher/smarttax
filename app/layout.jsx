// app/layout.jsx
// Root layout — wraps every page in Next.js App Router.
// This is where global styles, fonts, and metadata live.

import "./globals.css";

export const metadata = {
  title: "SmartTax Lite",
  description:
    "Indian Income Tax Calculator — Old vs New Regime + Expense Splitter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
