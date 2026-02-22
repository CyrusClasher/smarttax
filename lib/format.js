// lib/format.js
// Shared formatting utilities.
// Single source of truth — change number format here, updates everywhere.

/**
 * Formats a number as Indian Rupee string with en-IN locale.
 * e.g. 150000 → "₹1,50,000"
 *
 * @param {number} n
 * @returns {string}
 */
export const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
