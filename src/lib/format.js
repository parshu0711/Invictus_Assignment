export function formatDate(date) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  if (typeof date === "string") {
    return date.slice(0, 10);
  }
  return String(date);
}

export function dateValue(date) {
  const value = date instanceof Date ? date : new Date(date);
  return Number.isNaN(value.getTime()) ? 0 : value.getTime();
}
