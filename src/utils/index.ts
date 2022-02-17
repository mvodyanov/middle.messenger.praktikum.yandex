import { PlainObject } from '../types/types';

export const isObject = (value: unknown): value is PlainObject => typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';

export const isArray = (value: unknown): value is [] => Array.isArray(value);

export const isArrayOrObject = (
  value: unknown,
): value is [] | PlainObject => isObject(value) || isArray(value);

export const isEqual = (a:PlainObject, b:PlainObject): boolean => {
  if (a === b) return true;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  let equal = true;

  Object.keys(a).forEach((key) => {
    if (!equal) return;
    if (isArrayOrObject(a[key]) && isArrayOrObject(b[key])) {
      equal = isEqual(a[key], b[key]);
    } else {
      equal = a[key] === b[key];
    }
  });
  return equal;
};

const merge = (lhs: PlainObject, rhs: PlainObject): PlainObject => {
  let result = { ...lhs };
  Object.keys(rhs).forEach((key) => {
    if (result[key]) {
      result[key] = merge(result[key] as PlainObject, rhs[key] as PlainObject);
    } else {
      result = { ...result, [key]: rhs[key] };
    }
  });
  return result;
};

export const set = (
  object: PlainObject | unknown,
  path: string,
  value: unknown,
): PlainObject | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<PlainObject>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as PlainObject, result);
};

export const trim = (string: string, chars?: string): string => {
  if (string && !chars) {
    return string.trim();
  }

  const reg = new RegExp(`[${chars}]`, 'gi');
  return string.replace(reg, '');
};

export const isEmpty = (value: unknown) => {
  if (typeof value === 'boolean' || typeof value === 'number' || value == null) return true;
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const queryStringify = (data: PlainObject): string | never => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (isArray(value)) {
      const arrayValue = value.reduce<PlainObject>(
        (acc, arrData, i) => ({
          ...acc,
          [`${key}[${i}]`]: arrData,
        }),
        {},
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (isObject(value)) {
      const objValue = Object.keys(value || {}).reduce<PlainObject>(
        (acc, objKey) => ({
          ...acc,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {},
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
};
