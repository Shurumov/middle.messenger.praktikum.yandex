import { template } from './users-list.templ';
import Block from '/src/utils/block/block';
import * as Handlebars from 'handlebars';
import { FormField } from '/src/components/form-field/form-field';
import {
  StoreFields,
  storeManager
} from '/src/utils/store-manager/store-manager';
import './users-list.scss';
import { User } from '/src/services/api/users-api';
import { UserItem } from '/src/components/user-item';
import { handleSubmit } from '/src/utils/validation/form-validation';
import { chatsService } from '/src/services/chats.service';
import { usersService } from '/src/services/users.service';

export class UsersList extends Block {
  static getUsersItems(users) {
    const chatUsers = storeManager.get(StoreFields.usersInChat);

    const children = {};
    users?.forEach((user, index) => {
      const actionType =
        chatUsers &&
        Array.isArray(chatUsers) &&
        chatUsers.find((item: User) => item.id === user.id)
          ? 'remove'
          : 'add';

      children[`UserItem${index}`] = new UserItem({
        ...user,
        events: {
          click: () => {
            if (actionType === 'add') {
              chatsService.addUserToChat(user);
            } else {
              chatsService.deleteUserFromChat(user.id);
            }
          },
        }
      });
    });
    return children;
  }

  constructor() {
    const children = {
      SearchUsers: new FormField({
        label: 'Искать пользователей',
        name: 'query',
        placeholder: 'Поиск пользователей',
        classNames: ['users-list__search'],
        events: {
          input: (event) => {
            if (!event.target.value) {
              storeManager.set(StoreFields.showUsersInChat, true);
            } else {
              storeManager.set(StoreFields.showUsersInChat, false);
            }
          },
        },
      })
    };
    super({
      children,
      events: {
        '#searchUsersForm': handleSubmit(
          [children.SearchUsers],
          ({ query }: { query: string }) => {
            if (query) {
              usersService.searchUsers(query);
            }
          }
        )
      }
    }, 'div', ['users-list']);

    storeManager.subscribe(StoreFields.searchUsers, (users) => {
      this.setProps({
        children: {
          SearchUsers: this.props.children.SearchUsers,
          ...UsersList.getUsersItems(users)
        }
      });
    });

    storeManager.subscribe(StoreFields.usersInChat, (users) => {
      const children = UsersList.getUsersItems(users);
      this.setProps({
        events: this.props.events,
        children: {
          SearchUsers: this.props.children.SearchUsers,
          ...children
        },
        users: users.map((user, index) => `UserItem${index}`),
      });
    });

    storeManager.subscribe(StoreFields.showUsersInChat, (showUserInChat) => {
      if (showUserInChat) {
        this.setProps({
          children: {
            SearchUsers: this.props.children.SearchUsers,
            ...UsersList.getUsersItems(storeManager.get(StoreFields.usersInChat))
          },
        });
      }
    });

    storeManager.subscribe(StoreFields.isUserListOpened, (isUserListOpened) => {
      if (isUserListOpened) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
