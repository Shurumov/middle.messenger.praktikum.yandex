import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './profile.scss';
import '/src/styles/default.scss';
import { userInfoMock } from './user-info.mock';
import { storeManager, StoreFields } from '/src/utils/store-manager';
import { authService } from '/src/services';

export class ProfilePage extends Block {
  constructor() {
    authService.getUser();
    super({
      events: {
        '#logout': {
          click: () => authService.logout()
        }
      }
    }, 'div', ['flex']);
    storeManager.subscribe(StoreFields.user, (user) => {
      if (user) {
        userInfoMock.forEach(item => {
          item.value = user[item.key];
        });
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
