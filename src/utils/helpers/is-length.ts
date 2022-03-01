export function isLength(value: any) {
  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= Number.MAX_VALUE;
}
