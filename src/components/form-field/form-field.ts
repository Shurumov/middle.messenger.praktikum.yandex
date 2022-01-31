import * as Handlebars from 'handlebars';

import { FormFieldProps } from '/src/components/form-field/form-field.model';
import { formFieldTmpl } from './form-field.tmpl';
import Block from '/src/utils/block/block';
import './form-field.scss';
import { helpers } from '/src/utils/helpers';
import { getInputValidatorMethod } from '/src/utils/validation/input-validation';

export class FormField extends Block {
  constructor(props: FormFieldProps) {
    if (props.validators && !helpers.isEmpty(props.validators)) {
      props.events = props.events ?? {};
      const validationMethod = getInputValidatorMethod(props.validators);
      const handleEvent = (event: FocusEvent) => validationMethod(event.target);
      props.events.input = {
        ...props.events.input,
        focus: handleEvent,
        blur: handleEvent,
      };
    }

    const classList = props.class ? props.class : [];

    super(props, 'div', props.replaceClassList ? [...classList] : ['form-field', ...classList]);
  }

  render(): string {
    return Handlebars.compile(formFieldTmpl)(this.props);
  }

  validateInput(): boolean {
    const input = this.getContent().getElementsByTagName('input')[0];
    const validationMethod = getInputValidatorMethod(this.props.validators);

    return validationMethod(input);
  }
}
