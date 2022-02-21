import { template } from './index.templ';
import * as Handlebars from "handlebars";
import Block from '/src/utils/block/block';
import '/src/styles/default.scss'
import '/src/styles/error-page.scss'

export class ErrorPage extends Block {
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
