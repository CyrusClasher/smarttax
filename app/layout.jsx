import "./globals.css";

export const metadata = {
  title: "SmartTax",
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
