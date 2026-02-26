"use client";

import { useState } from "react";
import {
  Card,
  SectionTitle,
  Field,
  inputStyle,
  labelStyle,
} from "@/components/ui";
import { splitExpenses } from "@/lib/expenseSplitter";
import { fmt } from "@/lib/format";

const DEFAULT_EXPENSES = [
  { name: "Rent", amount: 25000 },
  { name: "Electricity", amount: 2000 },
  { name: "Internet", amount: 1200 },
];

export default function ExpenseSplitter() {
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [roommates, setRoommates] = useState(3);

  const splits = splitExpenses(expenses, roommates);
  const grandTotal = splits.reduce((sum, e) => sum + e.amount, 0);
  const perPersonTotal = splits.reduce((sum, e) => sum + e.perPerson, 0);

  const updateExpense = (index, key, value) =>
    setExpenses((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [key]: value } : e)),
    );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
      {/* ── Input Panel ── */}
      <Card>
        <SectionTitle accent="#34d399">Shared Expenses</SectionTitle>

        {expenses.map((e, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div>
              <label style={labelStyle}>Item</label>
              <input
                style={inputStyle}
                value={e.name}
                onChange={(ev) => updateExpense(i, "name", ev.target.value)}
                placeholder="Expense name"
              />
            </div>
            <div>
              <label style={labelStyle}>Amount (₹)</label>
              <input
                style={inputStyle}
                type="number"
                value={e.amount || ""}
                onChange={(ev) =>
                  updateExpense(i, "amount", Number(ev.target.value))
                }
                placeholder="0"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setExpenses((prev) => [...prev, { name: "", amount: 0 }])
          }
          style={{
            width: "100%",
            padding: "8px",
            background: "transparent",
            border: "1px dashed #2a2d3a",
            borderRadius: 8,
            color: "#475569",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          + Add Expense
        </button>

        <div style={{ marginTop: 20 }}>
          <Field
            label="Number of Roommates"
            value={roommates}
            onChange={setRoommates}
            placeholder="2"
          />
        </div>
      </Card>

      {/* ── Results Panel ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Summary banner */}
        <div
          style={{
            background: "rgba(52,211,153,0.06)",
            border: "1px solid rgba(52,211,153,0.2)",
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
                color: "#34d399",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              TOTAL SHARED
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#e2e8f0" }}>
              {fmt(grandTotal)}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              EACH PERSON PAYS
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#34d399" }}>
              {fmt(perPersonTotal)}
            </div>
          </div>
        </div>

        {/* Per-item breakdown */}
        <Card>
          <SectionTitle accent="#34d399">Breakdown per Person</SectionTitle>

          {splits.length === 0 ? (
            <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
              Add expenses and set roommates to see splits.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {[
                    "Expense",
                    "Total",
                    `Each (÷${roommates})`,
                    "% of Total",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "6px 8px",
                        borderBottom: "1px solid #1e2130",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {splits.map((e, i) => (
                  <tr key={i} style={{ color: "#94a3b8" }}>
                    <td
                      style={{
                        padding: "10px 8px",
                        color: "#e2e8f0",
                        fontWeight: 600,
                      }}
                    >
                      {e.name}
                    </td>
                    <td style={{ padding: "10px 8px" }}>{fmt(e.amount)}</td>
                    <td
                      style={{
                        padding: "10px 8px",
                        color: "#34d399",
                        fontWeight: 700,
                      }}
                    >
                      {fmt(e.perPerson)}
                    </td>
                    <td style={{ padding: "10px 8px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            height: 4,
                            borderRadius: 2,
                            width: 80,
                            background: "#1e2130",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 2,
                              width: `${(e.amount / grandTotal) * 100}%`,
                              background: "#6366f1",
                            }}
                          />
                        </div>
                        <span>
                          {Math.round((e.amount / grandTotal) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
