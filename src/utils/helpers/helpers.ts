import { registerHelper } from 'handlebars';

registerHelper("numToTime", (num: number) => {
  if (typeof num === "undefined") {
    return "";
  }
  const date = new Date(num);
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
});

function get(obj: Object, path: string, defaultValue?: string | number | null) {
  const keys = path.split(".");
  let result: Record<string, any> = obj;

  for (let key of keys) {
    result = result[key];

    if (typeof result === "undefined") {
      return defaultValue;
    }
  }

  return result;
}

function first(list: any[]) {
  return Array.isArray(list) && list.length ? list[0] : undefined;
}

function last(list: any[]) {
  return Array.isArray(list) ? list[list.length - 1] : undefined;
}

const baseRange = (start: number, end: number, step: number = 1, reverseOrder: boolean) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  while (length--) {
    result[reverseOrder ? length : ++index] = start;
    start += step;
  }

  return result;
};

function range(start: number = 0, end: number, step: number, reverseOrder: boolean = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, reverseOrder);
}

function reverseRange(start: number, end: number, step: number) {
  return range(start, end, step, true);
}

function isLength(value: any) {
  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= Number.MAX_VALUE;
}

function isNil(value: any) {
  return value === null || value === undefined;
}

function isArrayLike(value: any) {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

function isObjectLike(value: any) {
  return typeof value === "object" && value !== null;
}

function getTag(value: any) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return value.toString();
}

const objectProto = Object.prototype;

function isPrototype(value: Function | FunctionConstructor | Object) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value: any) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

function isEmpty(value: any) {
  if (isNil(value)) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
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

function isIterable(obj: any) {
  // checks for null and undefined
  if (isNil(obj)) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

function trim(str: string, extraBorderSymbols?: string): string {
  const regParam = extraBorderSymbols ? `[${extraBorderSymbols}]` : "\\s";
  const reg = new RegExp(`\^${regParam}+|${regParam}+\$`, "g");
  const result = str.replace(reg, "");
  return result;
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed<any> {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (isObjectLike(obj)) {
    return obj;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(obj as Indexed, result);
}

function isEqual(a: any, b: any): boolean {
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

function cloneDeep<T extends ObjectLiteral = ObjectLiteral>(obj: T): any {
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

type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
  if (!isObjectLike(data)) {
    throw new Error("input must be an object");
  }
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    if (withKeys(value)) {
      result.push(...stringifyObjectOrArray(value).map((item) => `${key}${item}`));
    } else {
      result.push(`${key}=${value}`);
    }
  }

  return result.join("&");
}

function withKeys(data: any) {
  return isObjectLike(data) || Array.isArray(data);
}

function stringifyObjectOrArray(data: any) {
  const result: any[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (withKeys(value)) {
      result.push(...stringifyObjectOrArray(value).map((item) => `[${key}]${item}`));
    } else {
      result.push(`[${key}]=${value}`);
    }
  });

  return result;
}


export const helpers = {
  get,
  first,
  last,
  range,
  reverseRange,
  isLength,
  isNil,
  isArrayLike,
  isObjectLike,
  getTag,
  isPrototype,
  isArguments,
  isEmpty,
  isIterable,
  trim,
  merge,
  set,
  isEqual,
  cloneDeep,
  queryStringify,
};
