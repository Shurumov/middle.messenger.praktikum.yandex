import { isObjectLike } from './is-object-like';

export function withKeys(data: any) {
  return isObjectLike(data) || Array.isArray(data);
}
