export function last<T>(list: Array<T>): T | undefined {
  return Array.isArray(list) && list.length > 0
    ? list[list.length - 1]
    : undefined;
}

export function first<T>(list: T[]): T | undefined {
  return Array.isArray(list) && list.length > 0 ? list[0] : undefined;
}

export function revert<T>(array: T[]): T[] {
  const newArray = [];
  for (let i = array.length - 1; i >= 0; i -= 1) {
    newArray.push(array[i]);
  }
  return newArray;
}

export function range(
  start: number,
  end: number,
  step: number,
  isRight: boolean,
): number[] {
  const array: number[] = [];

  let selfStart = start;
  let selfEnd = end;
  let selfStep = step;
  if (end === undefined) {
    selfEnd = start;
    selfStart = 0;
  }

  if (end === 0) {
    return array;
  }

  if (!step) {
    selfStep = end > 0 ? 1 : -1;
  }

  for (let i = selfStart; Math.abs(i) < Math.abs(selfEnd); i += selfStep) {
    array.push(i);
  }

  return isRight ? revert(array) : array;
}

export function rangeRight(start: number, end: number, step: number): number[] {
  return range(start, end, step, true);
}

export function isEmpty(value: unknown): boolean {
  if (typeof value === 'boolean' || typeof value === 'number' || value == null) { return true; }
  if (Array.isArray(value) || typeof value === 'string') { return value.length === 0; }
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
