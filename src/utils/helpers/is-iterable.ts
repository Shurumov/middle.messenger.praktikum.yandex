import { isNil } from './is-nil';

export function isIterable(obj: any) {
  // checks for null and undefined
  if (isNil(obj)) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}
