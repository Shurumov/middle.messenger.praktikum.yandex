import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '/src/utils/block/block';
import '/src/styles/default.scss'
import '/src/styles/error-page.scss'
class ErrorPage extends Block {
  constructor() {
    super({
      title: '404',
      text: 'Не туда попали',
    },'main', ['error-page']);
  }
  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new ErrorPage();
const root = document.getElementById("root");
root?.appendChild(page.getContent());
