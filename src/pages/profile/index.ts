import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './profile.scss';
import '/src/styles/default.scss'
import { userInfoMock } from './user-info.mock';

class ProfilePage extends Block {
  constructor() {
    super({
      userInfo: userInfoMock
    }, 'div', ['flex']);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}

const page = new ProfilePage();
const root = document.getElementById('root');
root?.appendChild(page.getContent());
