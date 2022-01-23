/* eslint-disable max-len */
import { ValidationRule } from '../types/types';

export const VALIDATION_RULES = {
  NAME: 'NAME',
  LOGIN: 'LOGIN',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  PHONE: 'PHONE',
  MESSAGE: 'MESSAGE',
};

const validationStorage: Record<string, ValidationRule> = {
  [VALIDATION_RULES.NAME]: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    errorText: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  [VALIDATION_RULES.LOGIN]: {
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    errorText: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },
  [VALIDATION_RULES.EMAIL]: {
    pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
    errorText: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  },
  [VALIDATION_RULES.PASSWORD]: {
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  [VALIDATION_RULES.PHONE]: {
    pattern: /^[+-d]?\d{10,15}$/,
    errorText: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
  },
  [VALIDATION_RULES.MESSAGE]: {
    pattern: /(.|\s)*\S(.|\s)*/,
    errorText: 'не должно быть пустым',
  },
};

export const validate = (value: string, rule?: string) => {
  if (!rule) return;
  if (!validationStorage[rule].pattern.test(value)) {
    throw new Error(validationStorage[rule].errorText);
  }
};
