"use client";
// components/TaxInputPanel.jsx
// Left-side input panel — income sources + deductions.
// Receives state + setters as props. Zero internal state.
// Designed this way so the parent (SmartTaxApp) owns all state — single source of truth.

import { Card, SectionTitle, Field } from "@/components/ui";
import { fmt } from "@/lib/format";

/**
 * @param {Object}   income       - { salary, freelance, rental }
 * @param {Function} setIncome    - State setter from SmartTaxApp
 * @param {Object}   deductions   - { sec80c, hra, healthIns }
 * @param {Function} setDeductions
 * @param {number}   grossIncome  - Pre-computed gross, passed down for display
 */
export default function TaxInputPanel({
  income,
  setIncome,
  deductions,
  setDeductions,
  grossIncome,
}) {
  // Curried setter — setI("salary")(800000) → setIncome({ ...prev, salary: 800000 })
  const setI = (key) => (val) => setIncome((prev) => ({ ...prev, [key]: val }));
  const setD = (key) => (val) => setDeductions((prev) => ({ ...prev, [key]: val }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Income Sources */}
      <Card>
        <SectionTitle accent="#4ade80">Income Sources</SectionTitle>
        <Field label="Salary (Annual)"  value={income.salary}    onChange={setI("salary")} />
        <Field label="Freelance Income" value={income.freelance} onChange={setI("freelance")} />
        <Field label="Rental Income"    value={income.rental}    onChange={setI("rental")} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 14px",
            background: "#0a0c13",
            borderRadius: 8,
            fontSize: 13,
            color: "#94a3b8",
          }}
        >
          Gross Income:{" "}
          <span style={{ color: "#4ade80", fontWeight: 700 }}>{fmt(grossIncome)}</span>
        </div>
      </Card>

      {/* Deductions */}
      <Card>
        <SectionTitle accent="#f59e0b">Deductions (Old Regime)</SectionTitle>
        <Field label="80C Investments (max ₹1.5L)" value={deductions.sec80c}    onChange={setD("sec80c")} />
        <Field label="HRA"                          value={deductions.hra}       onChange={setD("hra")} />
        <Field label="Health Insurance (80D)"       value={deductions.healthIns} onChange={setD("healthIns")} />
        <p style={{ fontSize: 11, color: "#475569", marginTop: 8, margin: 0 }}>
          * New Regime only allows ₹50,000 standard deduction
        </p>
      </Card>
    </div>
  );
}
