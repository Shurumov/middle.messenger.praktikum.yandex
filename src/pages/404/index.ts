import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '~src/utils/block/block';

class ErrorPage extends Block {
  constructor() {
    super({},'main', ['error-page']);
  }
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new ErrorPage();
const root = document.getElementById("root");
root?.appendChild(page.getContent());
