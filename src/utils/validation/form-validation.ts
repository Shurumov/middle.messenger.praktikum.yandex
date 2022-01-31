import { FormField } from '/src/components/form-field/form-field';
import { CustomElementEvents } from '/src/utils/block/block';
import { CustomInputEvent } from '/src/components/form-field/input-validator.model';

export function setFormValidation(): CustomElementEvents {
  return {
    submit: function(event: CustomInputEvent) {
      event.preventDefault();
      const inputs: HTMLCollection = event.target.getElementsByTagName('input');

      const validity = this.props.formFields.reduce((acc: boolean, fieldName: string) => {
        const component: FormField = this.props.children[fieldName];

        if (
          !Object.values(inputs).some(
            (input: HTMLInputElement) => input.name === component.props.name
          )
        ) {
          return acc;
        }

        const fieldValidity = component.validateInput();

        return acc && fieldValidity;
      }, true);

      if (validity) {
        let formValue = Object.values(inputs).reduce(
          (acc: Record<string, string | number>, { name, value }: HTMLInputElement) => {
            acc[name] = value;
            return acc;
          },
          {}
        );
        console.log(formValue);
      } else {
        console.log('Форма не валидна');
      }
    },
  };
}
