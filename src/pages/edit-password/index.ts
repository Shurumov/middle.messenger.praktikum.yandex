import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import { validateFormAndSubmit } from '/src/utils/validation/form-validation';
import { FormField } from '/src/components/form-field/form-field';
import { InputType } from '/src/components/form-field/form-field.model';
import { InputValidatorName } from '/src/utils/validation/input-validation';
import { usersService } from '/src/services/users.service';
import { FormValidators } from '/src/utils/validation/form-validation';
import './styles.scss';
import '/src/styles/default.scss';
import '/src/styles/container.scss';

export class EditPasswordPage extends Block {
  constructor() {
    const children = EditPasswordPage.getChildren();

    const events = {
      '#editPasswordForm': validateFormAndSubmit(
        [children.OldPasswordInput, children.PasswordInput, children.PasswordConfirmInput],
        ({ oldPassword, newPassword }) => {
          usersService.changePassword(oldPassword, newPassword);
        },
        [
          FormValidators.fieldsValuesShouldBeEqualValidator(
            [children.PasswordInput, children.PasswordConfirmInput],
            'Пароли должны совпадать'
          ),
        ]
      ),
    };

    super({
      children,
      events
    }, 'div', ['container']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }

  static getChildren() {
    return {
      OldPasswordInput: new FormField({
        label: 'Старый пароль',
        placeholder: 'Старый пароль',
        name: 'oldPassword',
        classNames: ['m-t-14'],
        type: InputType.Password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PasswordInput: new FormField({
        label: 'Новый пароль',
        placeholder: 'Новый пароль',
        name: 'newPassword',

        type: InputType.Password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PasswordConfirmInput: new FormField({
        label: 'Новый пароль ещё раз',
        placeholder: 'Новый пароль ещё раз',
        name: 'confirmNewPassword',

        type: InputType.Password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
    };
  }
}
