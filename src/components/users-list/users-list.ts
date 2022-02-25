import { template } from './users-list.templ'
import Block from '/src/utils/block/block';
import * as Handlebars from 'handlebars';
import {
  StoreFields,
  storeManager
} from '/src/utils/store-manager/store-manager';
import './users-list.scss';
import { ChatListItem } from '/src/components/chat-list-item';
import { chatsService } from '/src/services/chats.service';
import { UserItem } from '/src/components/user-item';

export class UsersList extends Block {
  constructor() {
    super({

    }, 'div', ['users-list']);
    storeManager.subscribe(StoreFields.usersInChat, (users) => {
      const children = {};
      users.forEach((user, index) => {
        children[`UserItem${index}`] = new UserItem({
          ...user,
          events: {
            click: () => {
              console.log(user);
            },
          }
        });
      });
      this.setProps({
        children,
        users: users.map((user, index) => `UserItem${index}`),
      })
    })
    storeManager.subscribe(StoreFields.isUserListOpened, (isUserListOpened) => {
      if (isUserListOpened) {
        this.show();
      } else {
        this.hide();
      }
    })
  }
  render() {
    return Handlebars.compile(template)(this.props);
  }
}
