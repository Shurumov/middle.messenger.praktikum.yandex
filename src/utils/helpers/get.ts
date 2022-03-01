export function get(obj: Object, path: string, defaultValue?: string | number | null) {
  const keys = path.split(".");
  let result: Record<string, any> = obj;

  for (let key of keys) {
    result = result[key];

    if (typeof result === "undefined") {
      return defaultValue;
    }
  }

  return result;
}
