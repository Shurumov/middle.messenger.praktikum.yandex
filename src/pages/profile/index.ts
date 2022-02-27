import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './profile.scss';
import '/src/styles/default.scss';
import { userInfoMock } from './user-info.mock';
import { storeManager, StoreFields } from '/src/utils/store-manager';
import { authService } from '/src/services';
import { User } from '/src/services/api/users-api';
import { fetcher } from '/src/services/fetcher';
import { usersService } from '/src/services/users.service';

export class ProfilePage extends Block {
  constructor() {
    authService.getUser();
    super({
      events: {
        '#logout': {
          click: () => authService.logout()
        },
        '#file': {
          change: event => {
            const form = new FormData(event.currentTarget.parentElement);
            usersService.changeProfileAvatar(form);
          }
        }
      }
    }, 'div', ['flex']);
    storeManager.subscribe(StoreFields.user, (user: User) => {
      if (user) {
        userInfoMock.forEach(item => {
          item.value = user[item.key];
        });
        this.setProps({
          userInfo: userInfoMock,
          avatar: `${fetcher.resourceUrl}${user.avatar}`
        });
      }
    });
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
