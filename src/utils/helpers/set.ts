import { isObjectLike } from './is-object-like';
import { merge } from './merge';
type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (isObjectLike(obj)) {
    return obj;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(obj as Indexed, result);
}

