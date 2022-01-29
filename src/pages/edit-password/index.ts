import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '~src/utils/block/block';
import { setFormValidation } from '~src/utils/validation/form-validation';
import { FormField } from '~src/components/form-field/form-field';
import { InputType } from '~src/components/form-field/form-field.model';
import { InputValidatorName } from '~src/utils/validation/input-validation';
import './styles.scss'
class EditPasswordPage extends Block {
  constructor() {
    super({
      children: {
        OldPasswordInput: new FormField({
          label: "Старый пароль",
          placeholder: "Старый пароль",
          name: "oldPassword",
          class: ['m-t-14'],
          type: InputType.password,
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        PasswordInput: new FormField({
          label: "Новый пароль",
          placeholder: "Новый пароль",
          name: "newPassword",

          type: InputType.password,
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        PasswordConfirmInput: new FormField({
          label: "Новый пароль ещё раз",
          placeholder: "Новый пароль ещё раз",
          name: "confirmNewPassword",

          type: InputType.password,
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
      },
      formFields: ["OldPasswordInput", "PasswordInput", "PasswordConfirmInput"],
      events: setFormValidation()
    },'div', ['container']);
  }
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new EditPasswordPage();
const root = document.getElementById("root");
root?.appendChild(page.getContent());
