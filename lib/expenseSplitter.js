// lib/expenseSplitter.js
// Pure function — completely independent of tax logic.
// Takes an expenses array + roommate count, returns per-person splits.
//
// Interview talking point:
//   "This is a separate module — it has no idea tax logic even exists.
//    That's intentional. Single responsibility."

/**
 * Splits shared expenses equally among roommates.
 *
 * @param {Array<{name: string, amount: number}>} expenses
 * @param {number} roommates - Number of people sharing costs
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
