import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './profile.scss';
import '/src/styles/default.scss'
import { userInfoMock } from './user-info.mock';
import { authService } from '/src/services';
import { storeManager, StoreFields } from '/src/utils/store-manager';

export class ProfilePage extends Block {
  constructor() {
    authService.checkUserAuthed();
    super({}, 'div', ['flex']);
    storeManager.subscribe(StoreFields.user, (user) => {
      if (user) {
        userInfoMock.forEach(item => {
          item.value = user[item.key]
        })
        this.setProps({
          userInfo: userInfoMock
        });
      }
    });
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
