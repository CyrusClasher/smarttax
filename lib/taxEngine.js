// lib/taxEngine.js
// Pure JavaScript tax engine — no React, no Next.js, no side effects.
// This is the brain of the app. Could run in Node.js, browser, or CLI unchanged.
//
// Interview talking point:
//   "I wrote the engine first, before touching any UI.
//    It's just functions — input goes in, a result object comes out."

import {
  TAX_SLABS,
  CESS_RATE,
  OLD_REGIME_80C_LIMIT,
  NEW_REGIME_STANDARD_DEDUCTION,
} from "@/constants/taxSlabs";

/**
 * Core progressive tax calculation.
 * Walks through slabs and taxes each rupee at its bracket's rate.
 *
 * Key line: Math.min(income, slab.limit) - prev
 *   → gives us exactly how much income falls within this slab.
 *
 * @param {number} income  - Taxable income after all deductions
 * @param {Array}  slabs   - Array of { limit, rate }
 * @returns {{ tax: number, breakdown: Array }}
 */
export function calculateProgressiveTax(income, slabs) {
  let tax = 0;
  let prev = 0;
  const breakdown = [];

  for (const slab of slabs) {
    if (income <= prev) break;

    const taxableInSlab = Math.min(income, slab.limit) - prev; // ← core logic
    const slabTax = taxableInSlab * slab.rate;

    if (taxableInSlab > 0) {
      breakdown.push({
        range: `₹${prev.toLocaleString("en-IN")} – ${
          slab.limit === Infinity
            ? "Above"
            : "₹" + slab.limit.toLocaleString("en-IN")
        }`,
        taxable: taxableInSlab,
        rate: slab.rate * 100,
        tax: slabTax,
      });
    }

    tax += slabTax;
    prev = slab.limit;
  }

  return { tax, breakdown };
}

/**
 * Main compute function — runs engine for both regimes, returns structured result.
 * Called once in SmartTaxApp; result flows down as props. No state inside.
 *
 * @param {Object} inputs
 * @param {number} inputs.salary
 * @param {number} inputs.freelance
 * @param {number} inputs.rental
 * @param {number} inputs.sec80c
 * @param {number} inputs.hra
 * @param {number} inputs.healthIns
 * @returns {Object} Full result with old/new regime details
 */
export function computeTax({
  salary,
  freelance,
  rental,
  sec80c,
  hra,
  healthIns,
}) {
  const grossIncome = salary + freelance + rental;

  // Old Regime — user-declared deductions reduce taxable income
  const totalDeductions =
    Math.min(sec80c, OLD_REGIME_80C_LIMIT) + hra + healthIns;
  const taxableOld = Math.max(0, grossIncome - totalDeductions);
  const oldResult = calculateProgressiveTax(taxableOld, TAX_SLABS.old);

  // New Regime — only flat standard deduction applies
  const taxableNew = Math.max(0, grossIncome - NEW_REGIME_STANDARD_DEDUCTION);
  const newResult = calculateProgressiveTax(taxableNew, TAX_SLABS.new);

  const addCess = (tax) => tax * CESS_RATE;

  return {
    grossIncome,
    old: {
      taxableIncome: taxableOld,
      deductions: totalDeductions,
      baseTax: oldResult.tax,
      cess: addCess(oldResult.tax),
      total: oldResult.tax + addCess(oldResult.tax),
      breakdown: oldResult.breakdown,
    },
    new: {
      taxableIncome: taxableNew,
      deductions: NEW_REGIME_STANDARD_DEDUCTION,
      baseTax: newResult.tax,
      cess: addCess(newResult.tax),
      total: newResult.tax + addCess(newResult.tax),
      breakdown: newResult.breakdown,
    },
  };
}
