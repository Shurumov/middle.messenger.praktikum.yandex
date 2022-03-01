import { isNil } from './is-nil';
import { isLength } from './is-length';

export function isArrayLike(value: any) {
  return !isNil(value) && typeof value !== 'function' && isLength(value.length);
}
