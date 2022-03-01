import { isObjectLike } from './is-object-like';

export function cloneDeep<T extends Record<string, any>>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep);
  } else if (isObjectLike(obj)) {
    const target: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        target[key] = value.map(cloneDeep);
      } else {
        target[key] = isObjectLike(value) ? cloneDeep(value) : value;
      }
    }
    return target;
  }

  return obj;
}
