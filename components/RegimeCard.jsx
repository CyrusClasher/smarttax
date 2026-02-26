"use client";

import { fmt } from "@/lib/format";

/**
 * @param {string}  label
 * @param {Object}  result
 * @param {boolean} isWinner
 */
export default function RegimeCard({ label, result, isWinner }) {
  return (
    <div
      style={{
        flex: 1,
        background: isWinner ? "rgba(99,102,241,0.08)" : "#0f1117",
        border: `1.5px solid ${isWinner ? "#6366f1" : "#1e2130"}`,
        borderRadius: 12,
        padding: 20,
        position: "relative",
        transition: "border-color 0.3s",
      }}
    >
      {isWinner && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: 12,
            background: "#6366f1",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            letterSpacing: "0.08em",
          }}
        >
          RECOMMENDED
        </div>
      )}

      <div
        style={{
          fontSize: 13,
          color: "#64748b",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: isWinner ? "#818cf8" : "#e2e8f0",
          marginBottom: 16,
        }}
      >
        {fmt(result.total)}
      </div>

      <div style={{ fontSize: 12, color: "#475569", lineHeight: 2.2 }}>
        <div>
          Taxable Income:{" "}
          <span style={{ color: "#94a3b8" }}>{fmt(result.taxableIncome)}</span>
        </div>
        <div>
          Deductions:{" "}
          <span style={{ color: "#94a3b8" }}>{fmt(result.deductions)}</span>
        </div>
        <div>
          Base Tax:{" "}
          <span style={{ color: "#94a3b8" }}>{fmt(result.baseTax)}</span>
        </div>
        <div>
          Cess (4%):{" "}
          <span style={{ color: "#94a3b8" }}>{fmt(result.cess)}</span>
        </div>
      </div>
    </div>
  );
}
