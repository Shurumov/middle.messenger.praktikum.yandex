import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';
import { sendFormHandler } from '~utils/send-form-handler';
import { Validator } from '~utils/validator';
import { Button } from '~blocks/button';
class SignInPage extends Block {
  constructor() {
    super({
      button: new Button({
        text: 'Авторизация',
        type: 'submit',
        class: 'button container__button',
        withInternalID: true
      })
    });
  }


  render() {
    renderDOM('body', templateFunction({
      button: this.children.button.render()
    }));
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', sendFormHandler(0));
      form[0].addEventListener('blur', (e: InputEvent) => {
        if(e?.target?.value) {
          console.log(Validator.validateName(e?.target.value));
        }
      });
    }
  }
}

const pageInstance = new SignInPage();

pageInstance.render();