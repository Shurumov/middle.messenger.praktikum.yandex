import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';

class SignInPage extends Block {
  constructor() {
    super();
  }

  render() {
    renderDOM('body', templateFunction({}));
  }
}

const pageInstance = new SignInPage();

pageInstance.render();