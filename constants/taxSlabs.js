export const TAX_SLABS = {
  old: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
  new: [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
};

export const CESS_RATE = 0.04;
export const OLD_REGIME_80C_LIMIT = 150000;
export const NEW_REGIME_STANDARD_DEDUCTION = 50000;
