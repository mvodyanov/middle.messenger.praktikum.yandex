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

export type UserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  role: string
};

export type MessageResponse = {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
};
