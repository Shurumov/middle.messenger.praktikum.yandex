import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';

class NotFoundPage extends Block {
  constructor() {
    super();
  }

  render() {
    renderDOM("body", templateFunction({}))
  }
}

const pageInstance = new NotFoundPage();

pageInstance.render();