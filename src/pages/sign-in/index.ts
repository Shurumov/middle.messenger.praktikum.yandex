import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '/src/utils/block/block';
import { FormField } from '/src/components/form-field/form-field';
import { InputValidatorName } from '/src/utils/validation/input-validation';
import { InputType } from '/src/components/form-field/form-field.model';
import { setFormValidation } from '/src/utils/validation/form-validation';
import './styles.scss';
import '/src/styles/default.scss'
import '/src/styles/container.scss'
export class SignInPage extends Block {
  constructor() {
    super({
      children: {
        LoginInput: new FormField({
          label: "Логин",
          placeholder: "Логин",
          name: "login",
          class: ['m-t-14'],
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        PasswordInput: new FormField({
          label: "Пароль",
          placeholder: "Пароль",
          name: "password",
          type: InputType.Password,

          validators: {
            [InputValidatorName.required]: null,
          },
        }),
      },
      formFields: ["LoginInput", "PasswordInput"],
      events: setFormValidation(),
    }, "div", ["flex"]);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
