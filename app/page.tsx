// app/page.jsx
// Next.js App Router page — this is a Server Component by default.
// We import the client-side SmartTaxApp which handles all interactivity.
// Separation: Next.js handles routing/SSR, SmartTaxApp handles UI logic.

import SmartTaxApp from "@/components/SmartTaxApp";

export default function Home() {
  return <SmartTaxApp />;
}
