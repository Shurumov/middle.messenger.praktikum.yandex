import { Props } from '/src/utils/block/props.model';
import { InputValidatorOptions } from '/src/components/form-field/input-validator.model';

export interface ChatInputProps extends Props {
  name: string;
  placeholder: string;
  label: string;
  errorText?: string;
  value?: string;
  validators?: InputValidatorOptions;
  class?: string[];
  replaceClassList?: boolean;
}
