import { withKeys } from './with-keys';
export function stringifyObjectOrArray(data: any) {
  const result: any[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (withKeys(value)) {
      result.push(...stringifyObjectOrArray(value).map((item) => `[${key}]${item}`));
    } else {
      result.push(`[${key}]=${value}`);
    }
  });

  return result;
}
