export function getTag(value: any) {
  if (value === undefined) {
    return "[object Undefined]";
  }
  if (value === null) {
    return "[object null]";
  }

  return value.toString();
}
