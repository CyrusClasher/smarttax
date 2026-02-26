/**
 * @param {Array<{name: string, amount: number}>} expenses
 * @param {number} roommates
 * @returns {Array<{name, amount, perPerson}>}
 */
export function splitExpenses(expenses, roommates) {
  if (!roommates || roommates < 2) return [];

  return expenses
    .filter((e) => e.amount > 0 && e.name.trim() !== "")
    .map((e) => ({
      ...e,
      perPerson: e.amount / roommates,
    }));
}
