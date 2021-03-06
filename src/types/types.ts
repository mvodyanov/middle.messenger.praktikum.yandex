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
  headers?: Record<string, string> | null
  data?: Record<string, any>
  isRawData?: boolean,
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

export type ChatListItemResponse = {
  id: number,
  title: string
  avatar: string
  unread_count: number
  last_message?: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    },
    time: string
    content: string
  }
};
