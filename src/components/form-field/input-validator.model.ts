import { FormField } from '/src/components/form-field/form-field';
export type InputValidatorOptions = Record<string, string | number | null | RegExp>;

export type CustomInputEvent = FocusEvent & { target: HTMLInputElement };

export type Validator = (element: HTMLInputElement) => boolean;

export type Validators = Record<string, (args: any | any[] | null) => (formField?: FormField) => boolean>;
