export const required =
  (errorMessage = 'This field is required!') =>
  (value?: string): string | undefined =>
    value ? undefined : errorMessage;

export const notEmpty =
  (errorMessage = 'This field cannot be empty!') =>
  (value?: string): string | undefined =>
    value && value.trim().length > 0 ? undefined : errorMessage;

export const mustBeNumber =
  (errorMessage = 'This field requires a number!') =>
  (value: number): string | undefined =>
    isNaN(value) ? errorMessage : undefined;

export const isEmail =
  (errorMessage = 'Please, enter a valid email!') =>
  (value: string): string | undefined =>
    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? undefined : errorMessage;

export const minValue =
  (min: number, errorMessage?: string) =>
  (value: number): string | undefined =>
    isNaN(value) || value >= min ? undefined : errorMessage || `Should be greater than ${min}!`;

export const maxValue =
  (max: number, errorMessage?: string) =>
  (value: number): string | undefined =>
    isNaN(value) || value <= max ? undefined : errorMessage || `Should be less than ${max}!`;

export const minLength =
  (min: number, errorMessage?: string) =>
  (value: string): string | undefined =>
    value && value.trim().length >= min ? undefined : errorMessage || `Should be at least ${min} characters!`;

export const maxLength =
  (max: number, errorMessage?: string) =>
  (value: string): string | undefined =>
    value && value.trim().length <= max ? undefined : errorMessage || `Should be less than ${max} characters!`;

export const matchRegex =
  (regexRule: RegExp, errorMessage = 'Should follow the required pattern!') =>
  (value: string): string | undefined =>
    regexRule.test(value) ? undefined : errorMessage;

export const composeValidators =
  (...validators: any[]) =>
  (value: unknown): string | undefined =>
    validators.reduce((error, validator) => error || validator(value), undefined);
