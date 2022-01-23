import BlockClass from '../utils/Block';

export type ValidationRule = {
  pattern: RegExp
  errorText: string
};

export type Block = BlockClass;
export type Children = Record<string, any>;

export type Props = any;

export type Options = {
  method?: string
  timeout?: number
  headers?: Record<string, string>
  data?: Record<string, any>
};
