import BlockClass from '../utils/Block';

export type ValidationRule = {
  pattern: RegExp
  errorText: string
};

export type Block = BlockClass;
export type Children = Record<string, any>;

export type Props = any;
