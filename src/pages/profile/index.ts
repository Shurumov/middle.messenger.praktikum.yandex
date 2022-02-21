import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './profile.scss';
import '/src/styles/default.scss'
import { userInfoMock } from './user-info.mock';

export class ProfilePage extends Block {
  constructor() {
    super({
      userInfo: userInfoMock
    }, 'div', ['flex']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
