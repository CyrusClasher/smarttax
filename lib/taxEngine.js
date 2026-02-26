import {
  TAX_SLABS,
  CESS_RATE,
  OLD_REGIME_80C_LIMIT,
  NEW_REGIME_STANDARD_DEDUCTION,
} from "@/constants/taxSlabs";

/**
 * @param {number} income
 * @param {Array}  slabs
 * @returns {{ tax: number, breakdown: Array }}
 */
export function calculateProgressiveTax(income, slabs) {
  let tax = 0;
  let prev = 0;
  const breakdown = [];

  for (const slab of slabs) {
    if (income <= prev) break;

    const taxableInSlab = Math.min(income, slab.limit) - prev;
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
 * @param {Object} inputs
 * @param {number} inputs.salary
 * @param {number} inputs.freelance
 * @param {number} inputs.rental
 * @param {number} inputs.sec80c
 * @param {number} inputs.hra
 * @param {number} inputs.healthIns
 * @returns {Object}
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

  const totalDeductions =
    Math.min(sec80c, OLD_REGIME_80C_LIMIT) + hra + healthIns;
  const taxableOld = Math.max(0, grossIncome - totalDeductions);
  const oldResult = calculateProgressiveTax(taxableOld, TAX_SLABS.old);

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
