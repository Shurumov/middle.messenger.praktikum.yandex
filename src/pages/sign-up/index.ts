import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import { FormField } from '/src/components/form-field/form-field';
import {
  InputValidatorName,
  InputValidationPattern
} from '/src/utils/validation/input-validation';
import { InputType } from '/src/components/form-field/form-field.model';
import { validateFormAndSubmit } from '/src/utils/validation/form-validation';
import { authService } from '/src/services';
import './style.scss'
import '/src/styles/default.scss'
import '/src/styles/container.scss'
import { FormValidators } from '/src/utils/validation/form-validation';

export class SignUpPage extends Block {

  constructor() {
    authService.checkUserAuthed();

    const children = SignUpPage.getChildren();

    const events = {
      "#signupForm": validateFormAndSubmit(
        [
          children.EmailInput,
          children.LoginInput,
          children.FirstNameInput,
          children.SecondNameInput,
          children.PhoneInput,
          children.PasswordInput,
          children.PasswordConfirmInput,
        ],
        (user) => authService.signup(user),
        [
          FormValidators.fieldsValuesShouldBeEqualValidator(
            [children.PasswordInput, children.PasswordConfirmInput],
            "Пароли должны совпадать"
          ),
        ]
      ),
    };

    super({ children, events }, "div", ["container"]);

  }

  static getChildren() {
    return {
      EmailInput: new FormField({
        label: 'Почта',
        placeholder: 'Почта',
        name: 'email',
        classNames: ['m-t-14'],
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
        type: InputType.Password,
      }),
      PasswordConfirmInput: new FormField({
        label: 'Новый пароль ещё раз',
        placeholder: 'Новый пароль ещё раз',
        name: 'confirm_verification',
        validators: {
          [InputValidatorName.required]: null,
        },
        type: InputType.Password,
      }),
    };
  }


  render() {
    return Handlebars.compile(template)(this.props);
  }
}
