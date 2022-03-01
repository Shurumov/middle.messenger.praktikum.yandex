import { FormField } from '/src/components/form-field/form-field';
import { CustomElementEvents } from '/src/utils/block';
import { CustomInputEvent } from '/src/components/form-field/input-validator.model';
import { helpers } from '/src/utils/helpers';

type FormValidatorConstructor = (formFields?: FormField[], errorText?: string) => () => boolean;

type FormValidator = () => boolean;

export const FormValidators: { [key: string]: FormValidatorConstructor } = {
  fieldsValuesShouldBeEqualValidator:
    (formFields: FormField[], errorText: string) => (): boolean => {
      const validity = helpers.isEmpty(
        formFields.filter((item) => item.getInputValue() !== formFields[0].getInputValue())
      );

      if (!validity) {
        formFields.forEach((field) => field.setErrorText(errorText));
      }

      return validity;
    },
};

export function validateForm(formFields: FormField[],formValidators: FormValidator[] = []) {
  let validity = true;

  validity = formFields.reduce((acc: boolean, formField: FormField) => {
    const fieldValidity = formField.validateInput();

    return acc && fieldValidity;
  }, validity);

  validity = formValidators.reduce((acc: boolean, formValidator: FormValidator) => {
    const formValidity = formValidator();

    return acc && formValidity;
  }, validity);

  return validity;
}

export function handleSubmit(
  formFields: FormField[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitCallback: (...args: any) => void,
  formValidators: FormValidator[] = []
): CustomElementEvents {
  return {
    submit: function (event: CustomInputEvent) {
      event.preventDefault();

      const inputs: HTMLCollection = event.target.getElementsByTagName("input");

      if (validateForm(formFields, formValidators)) {
        const formValue = Object.values(inputs).reduce(
          (acc: { [key: string]: string | number }, input: HTMLInputElement) => {
            acc[input.name] = input.value;
            return acc;
          },
          {}
        );
        submitCallback(formValue);
      }
    },
  };
}
