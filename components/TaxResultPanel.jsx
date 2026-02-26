"use client";

import { useState } from "react";
import { Card, SectionTitle } from "@/components/ui";
import RegimeCard from "@/components/RegimeCard";
import SlabTable from "@/components/SlabTable";
import { fmt } from "@/lib/format";

/**
 * @param {Object} result
 */
export default function TaxResultPanel({ result }) {
  const [activeRegime, setActiveRegime] = useState("old");

  const winner = result.old.total <= result.new.total ? "old" : "new";
  const savings = Math.abs(result.old.total - result.new.total);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Best regime banner */}
      <div
        style={{
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 12,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6366f1",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            BEST REGIME: {winner.toUpperCase()} REGIME
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            You save{" "}
            <span style={{ color: "#4ade80", fontWeight: 700 }}>
              {fmt(savings)}
            </span>{" "}
            by choosing the {winner} regime
          </div>
        </div>
        <div style={{ fontSize: 32, color: "#6366f1", opacity: 0.4 }}>⚖</div>
      </div>

      {/* Side-by-side regime cards */}
      <div style={{ display: "flex", gap: 16 }}>
        <RegimeCard
          label="Old Regime"
          result={result.old}
          isWinner={winner === "old"}
        />
        <RegimeCard
          label="New Regime"
          result={result.new}
          isWinner={winner === "new"}
        />
      </div>

      {/* Slab breakdown with regime toggle */}
      <Card>
        {/* Regime toggle buttons */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {["old", "new"].map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegime(r)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${activeRegime === r ? "#6366f1" : "#1e2130"}`,
                background:
                  activeRegime === r ? "rgba(99,102,241,0.15)" : "transparent",
                color: activeRegime === r ? "#818cf8" : "#475569",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {r === "old" ? "Old" : "New"} Regime
            </button>
          ))}
        </div>

        <SectionTitle accent="#f87171">Slab-by-Slab Breakdown</SectionTitle>
        <SlabTable breakdown={result[activeRegime].breakdown} />

        {/* Total row */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid #1e2130",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <span style={{ color: "#64748b" }}>
            Total Tax Payable (incl. 4% cess)
          </span>
          <span style={{ color: "#f87171", fontWeight: 700, fontSize: 16 }}>
            {fmt(result[activeRegime].total)}
          </span>
        </div>
      </Card>
    </div>
  );
}
