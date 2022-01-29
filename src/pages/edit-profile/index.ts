import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '~src/utils/block/block';
import { setFormValidation } from '~src/utils/validation/form-validation';
import { FormField } from '~src/components/form-field/form-field';
import {
  InputValidationPattern,
  InputValidatorName
} from '~src/utils/validation/input-validation';
import './styles.scss';

class EditProfilePage extends Block {
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
        DisplayNameInput: new FormField({
          label: 'Имя в чате',
          placeholder: 'Имя в чате',
          name: 'display_name',
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
      },
      formFields: [
        'EmailInput',
        'LoginInput',
        'FirstNameInput',
        'SecondNameInput',
        'DisplayNameInput',
        'PhoneInput',
      ],
      events: setFormValidation(),
    }, 'div', ['flex']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new EditProfilePage();
const root = document.getElementById('root');
root?.appendChild(page.getContent());
