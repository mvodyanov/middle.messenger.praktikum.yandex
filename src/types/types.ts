import BlockClass from '../utils/Block';

export type ValidationRule = {
  pattern: RegExp
  errorText: string
};

export type Block = BlockClass;

export type Children = Record<string, any>;

export type Options = {
  method?: string
  timeout?: number
  headers?: Record<string, string>
  data?: Record<string, any>
};

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type Props = PlainObject;

export type FormData = Record<string, string>;

export type AConstructorTypeOf<T> = new (...args:any[]) => T;
