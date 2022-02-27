import { InputValidatorOptions } from './input-validator.model';
import { Props } from '/src/utils/block/props.model';

export enum InputType {
  Button = "button",
  Checkbox = "checkbox",
  Color = "color",
  Date = "date",
  DatetimeLocal = "datetime-local",
  Email = "email",
  File = "file",
  Hidden = "hidden",
  Image = "image",
  Month = "month",
  Number = "number",
  Password = "password",
  Radio = "radio",
  Range = "range",
  Reset = "reset",
  Search = "search",
  Submit = "submit",
  Tel = "tel",
  Text = "text",
  Time = "time",
  Url = "url",
  Week = "week",
}

export interface FormFieldProps extends Props {
  name: string;
  placeholder: string;
  label: string;
  errorText?: string;
  type?: InputType;
  value?: string;
  validators?: InputValidatorOptions;
  class?: string[];
  replaceClassList?: boolean;
}
