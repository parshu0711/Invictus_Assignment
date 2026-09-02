export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const baseCents = Math.floor(totalCents / n);
  const remainder = totalCents % n;

  const shares = {};
  for (const id of ids) {
    shares[id] = Number((baseCents / 100).toFixed(2));
  }

  for (let i = 0; i < remainder; i += 1) {
    const id = ids[i];
    shares[id] = Number((Number(shares[id]) + 0.01).toFixed(2));
  }

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  return values.reduce((a, b) => a + b, 0) === 100;
}

export function splitByPercent(amount, percents) {
  const entries = Object.entries(percents);
  const totalPct = entries.reduce((sum, [, pct]) => sum + Number(pct), 0) || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const shares = {};
  const allocations = [];
  let remaining = totalCents;

  for (const [id, pct] of entries) {
    const rawCents = (totalCents * Number(pct)) / totalPct;
    const wholeCents = Math.floor(rawCents);
    shares[id] = wholeCents;
    remaining -= wholeCents;
    allocations.push({ id, fraction: rawCents - wholeCents });
  }

  allocations.sort((a, b) => b.fraction - a.fraction);
  for (let i = 0; i < remaining; i += 1) {
    shares[allocations[i].id] += 1;
  }

  return Object.fromEntries(
    Object.entries(shares).map(([id, cents]) => [id, Number((cents / 100).toFixed(2))])
  );
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
