import * as Handlebars from 'handlebars';

import { FormFieldProps } from '/src/components/form-field/form-field.model';
import { formFieldTmpl } from './form-field.tmpl';
import Block from '/src/utils/block/block';
import './form-field.scss';
import { helpers } from '/src/utils/helpers';
import { getInputValidatorMethod } from '/src/utils/validation/input-validation';

export class FormField extends Block {
  constructor(props: FormFieldProps, tag: string, className: string[]) {
    super(props, tag || "div", className || ["form-field", ...(props.classNames ?? [])]);

    if (props.validators && !helpers.isEmpty(props.validators)) {
      props.events = props.events ?? {};
      const validationMethod = getInputValidatorMethod(props.validators).bind(this);
      props.events.input = {
        ...(props.events.input ?? {}),
        focus: () => validationMethod(this),
        blur: () => validationMethod(this),
      };
    }
    this.setProps(props);

    if (props.disabled) {
      this.getInputElem().disabled = true;
    }
  }

  render(): string {
    return Handlebars.compile(formFieldTmpl)(this.props);
  }

  setDisabled(disableValue: boolean): void {
    this.getInputElem().disabled = disableValue;
  }

  validateInput(): boolean {
    const input = this.getInputElem();
    const validationMethod = getInputValidatorMethod(this.props.validators).bind(this);

    return validationMethod(input);
  }

  getInputValue(): string {
    return this.getInputElem().value;
  }

  setValue(value: string | null): void {
    this.getInputElem().value = value ? value : "";
  }

  setErrorText(errorText: string): void {
    const errorTextElem = this.getInputElem().nextElementSibling;
    if (errorTextElem) {
      errorTextElem.textContent = errorText;
    }
  }

  isInputHasClass(className: string): boolean {
    return this.getInputClassList().contains(className);
  }

  addClassName(className: string): void {
    this.getInputClassList().add(className);
  }

  deleteClassName(className: string): void {
    this.getInputClassList().remove(className);
  }

  private getInputElem(): HTMLInputElement {
    return this.getBlock().getElementsByTagName("input")[0];
  }

  private getInputClassList(): DOMTokenList {
    return this.getInputElem().classList;
  }
}
