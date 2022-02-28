import { registerHelper } from 'handlebars';
import { get } from './get';
import { isEqual } from './is-equal';
import { isObjectLike } from './is-object-like';
import { isNil } from './is-nil';
import { isLength } from './is-length';
import { isArrayLike } from './is-array-like';
import { getTag } from './get-tag';
import { isPrototype } from './is-prototype';
import { isArguments } from './is-arguments';
import { isEmpty } from './is-empty';
import { isIterable } from './is-iterable';
import { withKeys } from './with-keys';
import { stringifyObjectOrArray } from './stringify-object-or-array';
import { merge } from './merge';
import { queryStringify } from './query-stringify';
import { cloneDeep } from './clone-deep';

registerHelper('numToTime', (num: number) => {
  if (typeof num === 'undefined') {
    return '';
  }
  const date = new Date(num);
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
});

export const helpers = {
  get,
  isEqual,
  isObjectLike,
  isNil,
  isLength,
  isArrayLike,
  getTag,
  isPrototype,
  isArguments,
  isEmpty,
  isIterable,
  withKeys,
  stringifyObjectOrArray,
  merge,
  queryStringify,
  cloneDeep,
};
