"use client";

import { fmt } from "@/lib/format";

const HEADERS = ["Slab Range", "Taxable Amt", "Rate", "Tax"];

/**
 * @param {Array} breakdown
 */
export default function SlabTable({ breakdown }) {
  if (!breakdown.length) {
    return (
      <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
        No tax liability in this regime.
      </p>
    );
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {HEADERS.map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "6px 8px",
                borderBottom: "1px solid #1e2130",
                fontWeight: 600,
                fontSize: 11,
                color: "#475569",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {breakdown.map((row, i) => (
          <tr key={i} style={{ color: "#94a3b8" }}>
            <td style={{ padding: "8px" }}>{row.range}</td>
            <td style={{ padding: "8px" }}>{fmt(row.taxable)}</td>
            <td style={{ padding: "8px" }}>{row.rate}%</td>
            <td
              style={{
                padding: "8px",
                color: row.tax > 0 ? "#f87171" : "#4ade80",
              }}
            >
              {fmt(row.tax)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
