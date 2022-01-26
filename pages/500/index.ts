import templateFunction from './index.hbs';
import { Block } from '~utils/block';
import { renderDOM } from '~utils/render-dom';

class ServerErrorPage extends Block {
  constructor() {
    super();
  }

  render() {
    renderDOM("body", templateFunction({}))
  }
}

const pageInstance = new ServerErrorPage();

pageInstance.render();