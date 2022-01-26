import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';
import { sendFormHandler } from '~utils/send-form-handler';

class SignUpPage extends Block {
  constructor() {
    super();
  }

  render() {
    renderDOM("body", templateFunction({}));
    const form = document.querySelector('form');
    if(form) {
      form.addEventListener('submit', sendFormHandler(0))
    }
  }
}

const pageInstance = new SignUpPage();

pageInstance.render();