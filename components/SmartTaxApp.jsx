"use client";

import { useState } from "react";
import { computeTax } from "@/lib/taxEngine";
import TaxInputPanel from "@/components/TaxInputPanel";
import TaxResultPanel from "@/components/TaxResultPanel";
import ExpenseSplitter from "@/components/ExpenseSplitter";

const DEFAULT_INCOME = {
  salary: 800000,
  freelance: 200000,
  rental: 0,
};

const DEFAULT_DEDUCTIONS = {
  sec80c: 150000,
  hra: 60000,
  healthIns: 25000,
};

const TABS = [
  { id: "tax", label: "Tax Calculator" },
  { id: "split", label: "Expense Splitter" },
];

export default function SmartTaxApp() {
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [deductions, setDeductions] = useState(DEFAULT_DEDUCTIONS);
  const [activeTab, setActiveTab] = useState("tax");

  const result = computeTax({ ...income, ...deductions });

  return (
    <main style={{ minHeight: "100vh", padding: "32px 16px" }}>
      {/* ── Header ── */}
      <header style={{ maxWidth: 960, margin: "0 auto 32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
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
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            SmartTax <span style={{ color: "#6366f1" }}></span>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "340px 1fr",
              gap: 20,
            }}
          >
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
      </div>
    </main>
  );
}
