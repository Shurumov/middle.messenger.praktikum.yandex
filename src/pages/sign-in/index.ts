import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import { FormField } from '/src/components/form-field/form-field';
import { InputValidatorName } from '/src/utils/validation/input-validation';
import { InputType } from '/src/components/form-field/form-field.model';
import { validateFormAndSubmit } from '/src/utils/validation/form-validation';
import { authService } from '/src/services';

import './styles.scss';
import '/src/styles/default.scss';
import '/src/styles/container.scss';

export class SignInPage extends Block {
  constructor() {
    const children = SignInPage.getChildren();

    const events = {
      "#loginForm": validateFormAndSubmit(
        [children.LoginInput, children.PasswordInput],
        ({ login, password }) => authService.login(login, password)
      ),
    };

    super({
      children,
      events
    }, "div", ["flex"]);
  }

  componentDidMount() {
    authService.checkUserAuthed();
  }

  static getChildren() {
    return {
      LoginInput: new FormField({
        label: "Логин",
        placeholder: "Логин",
        name: "login",
        classNames: ['m-t-14'],
        type: InputType.Text,
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
    };
  }


  render() {
    return Handlebars.compile(template)(this.props);
  }
}
