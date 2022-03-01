import { isObjectLike } from './is-object-like';
export function isEqual(a: any, b: any): boolean {
  if (!isObjectLike(a)) {
    return isObjectLike(b) ? false : a === b;
  }

  if (!isObjectLike(b)) {
    return isObjectLike(a) ? false : a === b;
  }

  const aKeys = Object.keys(a);
  if (aKeys.length !== Object.keys(b).length) {
    return false;
  }

  for (const key of aKeys) {
    if (isObjectLike(a[key]) && isObjectLike(b[key])) {
      if (isEqual(a[key], b[key])) {
        continue;
      }
      return false;
    } else if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
