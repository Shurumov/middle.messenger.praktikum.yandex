import { isNil } from './is-nil';
import { isArrayLike } from './is-array-like';
import { isArguments } from './is-arguments';
import { getTag } from './get-tag';
import { isPrototype } from './is-prototype';

export function isEmpty(value: any) {
  if (isNil(value)) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === 'string' ||
      typeof value.splice === 'function' ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
