import { isObjectLike } from './is-object-like';
import { withKeys } from './with-keys';
import { stringifyObjectOrArray } from './stringify-object-or-array';

type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
  if (!isObjectLike(data)) {
    throw new Error('input must be an object');
  }
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    if (withKeys(value)) {
      result.push(...stringifyObjectOrArray(value).map((item) => `${key}${item}`));
    } else {
      result.push(`${key}=${value}`);
    }
  }

  return result.join('&');
}
