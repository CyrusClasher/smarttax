"use client";
// components/ui.jsx
// Reusable primitive components — Field, Card, SectionTitle.
// Zero business logic. These are purely presentational building blocks.
// "use client" because they render in the browser (contain DOM elements).

export const inputStyle = {
  width: "100%",
  background: "#0f1117",
  border: "1px solid #2a2d3a",
  borderRadius: 8,
  color: "#e2e8f0",
  padding: "10px 14px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export const labelStyle = {
  fontSize: 12,
  color: "#64748b",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  marginBottom: 6,
  display: "block",
};

/**
 * Numeric input field with a label.
 * Converts string input to number before calling onChange.
 */
export function Field({ label, value, onChange, placeholder = "0" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <input
        style={inputStyle}
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={0}
      />
    </div>
  );
}

/**
 * Dark-themed card container.
 * Accepts optional style overrides.
 */
export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#13161f",
        border: "1px solid #1e2130",
        borderRadius: 12,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Section heading with a colored left-border accent.
 */
export function SectionTitle({ children, accent = "#6366f1" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div
        style={{ width: 3, height: 20, borderRadius: 2, background: accent }}
      />
      <h3
        style={{
          margin: 0,
          fontSize: 15,
          fontWeight: 700,
          color: "#cbd5e1",
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </h3>
    </div>
  );
}
