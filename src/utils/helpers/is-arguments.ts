import { isObjectLike } from './is-object-like';
import { getTag } from './get-tag';

export function isArguments(value: any) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}
