import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '~src/utils/block/block';
import { FormField } from '~src/components/form-field/form-field';
import {
  InputValidatorName,
  InputValidationPattern
} from '~src/utils/validation/input-validation';
import { InputType } from '~src/components/form-field/form-field.model';
import { setFormValidation } from '~src/utils/validation/form-validation';
import './style.scss'

class SignUpPage extends Block {
  constructor() {
    super({
      children: {
        EmailInput: new FormField({
          label: 'Почта',
          placeholder: 'Почта',
          name: 'email',
          class: ['m-t-14'],
          validators: {
            [InputValidatorName.required]: null,
            [InputValidatorName.pattern]: InputValidationPattern.email,
          },
        }),
        LoginInput: new FormField({
          label: 'Логин',
          placeholder: 'Логин',
          name: 'login',
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        FirstNameInput: new FormField({
          label: 'Имя',
          placeholder: 'Имя',
          name: 'first_name',
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        SecondNameInput: new FormField({
          label: 'Фамилия',
          placeholder: 'Фамилия',
          name: 'second_name',
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        PhoneInput: new FormField({
          label: 'Телефон',
          placeholder: 'Телефон',
          name: 'phone',
          validators: {
            [InputValidatorName.required]: null,
            [InputValidatorName.pattern]: InputValidationPattern.phone,
          },
        }),
        PasswordInput: new FormField({
          label: 'Пароль',
          placeholder: 'Пароль',
          name: 'password',
          validators: {
            [InputValidatorName.required]: null,
          },
          type: InputType.password,
        }),
        PasswordConfirmInput: new FormField({
          label: 'Новый пароль ещё раз',
          placeholder: 'Новый пароль ещё раз',
          name: 'confirm_verification',
          validators: {
            [InputValidatorName.required]: null,
          },
          type: InputType.password,
        }),
      },
      formFields: [
        'EmailInput',
        'LoginInput',
        'FirstNameInput',
        'SecondNameInput',
        'PhoneInput',
        'PasswordInput',
        'PasswordConfirmInput',
      ],
      events: setFormValidation(),
    }, 'div', ['container']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new SignUpPage();
const root = document.getElementById('root');
root?.appendChild(page.getContent());
