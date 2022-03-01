import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import { handleSubmit } from '/src/utils/validation/form-validation';
import { FormField } from '/src/components/form-field/form-field';
import {
  InputValidationPattern,
  InputValidatorName
} from '/src/utils/validation/input-validation';
import { UserInfo } from '/src/services/api/users-api';
import { usersService } from '/src/services/users.service';
import { storeManager, StoreFields } from '/src/utils/store-manager';
import { authService } from '/src/services';
import './styles.scss';
import '/src/styles/default.scss';
import '/src/styles/container.scss';


export class EditProfilePage extends Block {
  constructor() {
    authService.getUser();
    const children = EditProfilePage.getChildren();

    const events = {
      '#editUserProfileForm': handleSubmit(
        [
          children.EmailInput,
          children.LoginInput,
          children.FirstNameInput,
          children.SecondNameInput,
          children.PhoneInput,
          children.DisplayNameInput,
        ],
        async (userInfo: UserInfo) => {
          storeManager.set(StoreFields.user, userInfo);
          await usersService.changeProfile(userInfo);
        }
      ),
    };

    super({ events, children }, 'div', ['flex']);

    storeManager.subscribe(StoreFields.user, (user: UserInfo) => {
      if (user) {
        const {
          EmailInput,
          LoginInput,
          FirstNameInput,
          SecondNameInput,
          PhoneInput,
          DisplayNameInput,
        } = this.props.children;

        FirstNameInput.setValue(user.first_name);
        SecondNameInput.setValue(user.second_name);
        LoginInput.setValue(user.login);
        EmailInput.setValue(user.email);
        PhoneInput.setValue(user.phone);
        DisplayNameInput.setValue(user.display_name);
      }
    });
  }

  static getChildren(): Record<string, any> {
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
    };
  }


  render() {
    return Handlebars.compile(template)(this.props);
  }
}
