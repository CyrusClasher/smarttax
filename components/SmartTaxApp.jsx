"use client";
// components/SmartTaxApp.jsx
// Root client component — owns top-level state, calls the engine once,
// and passes data down. This is the "controller" in the app.
//
// Why not put this in app/page.jsx?
//   Next.js App Router pages are Server Components by default.
//   "use client" can't go in page.jsx cleanly — so we delegate to this component.
//
// Data flow (interview-ready explanation):
//   User types → state updates → computeTax() runs → result flows to panels
//   Nothing computes in the UI — UI only renders what lib/ returns.

import { useState } from "react";
import { computeTax }      from "@/lib/taxEngine";
import TaxInputPanel       from "@/components/TaxInputPanel";
import TaxResultPanel      from "@/components/TaxResultPanel";
import ExpenseSplitter     from "@/components/ExpenseSplitter";

// Default values — pre-filled so the app is immediately useful
const DEFAULT_INCOME = {
  salary:    800000,
  freelance: 200000,
  rental:    0,
};

const DEFAULT_DEDUCTIONS = {
  sec80c:    150000,
  hra:       60000,
  healthIns: 25000,
};

const TABS = [
  { id: "tax",   label: "Tax Calculator"   },
  { id: "split", label: "Expense Splitter" },
];

export default function SmartTaxApp() {
  // All state lives here — single source of truth
  const [income, setIncome]         = useState(DEFAULT_INCOME);
  const [deductions, setDeductions] = useState(DEFAULT_DEDUCTIONS);
  const [activeTab, setActiveTab]   = useState("tax");

  // Engine call — runs on every render (fast, pure function, no async)
  const result = computeTax({ ...income, ...deductions });

  return (
    <main style={{ minHeight: "100vh", padding: "32px 16px" }}>

      {/* ── Header ── */}
      <header style={{ maxWidth: 960, margin: "0 auto 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#fff",
            }}
          >
            ₹
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>
            SmartTax <span style={{ color: "#6366f1" }}>Lite</span>
          </h1>
        </div>
        <p style={{ margin: 0, color: "#475569", fontSize: 13 }}>
          Indian Income Tax Calculator · Old vs New Regime · Expense Splitter
        </p>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* ── Tab Navigation ── */}
        <nav
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 24,
            background: "#0f1117",
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
            border: "1px solid #1e2130",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                background: activeTab === tab.id ? "#6366f1" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#475569",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── Tab Content ── */}
        {activeTab === "tax" && (
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
            <TaxInputPanel
              income={income}
              setIncome={setIncome}
              deductions={deductions}
              setDeductions={setDeductions}
              grossIncome={result.grossIncome}
            />
            <TaxResultPanel result={result} />
          </div>
        )}

        {activeTab === "split" && <ExpenseSplitter />}

        {/* ── Build Steps Footer (interview talking points) ── */}
        <footer
          style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "#0f1117",
            border: "1px solid #1e2130",
            borderRadius: 12,
            fontSize: 12,
            color: "#475569",
            lineHeight: 2,
          }}
        >
          <span style={{ color: "#6366f1", fontWeight: 700 }}>Folder Map: </span>
          <span style={{ color: "#64748b" }}>
            constants/taxSlabs.js (data) →{" "}
            lib/taxEngine.js (pure logic) →{" "}
            lib/expenseSplitter.js →{" "}
            lib/format.js →{" "}
            components/*.jsx (UI) →{" "}
            app/page.jsx (Next.js entry)
          </span>
        </footer>
      </div>
    </main>
  );
}
