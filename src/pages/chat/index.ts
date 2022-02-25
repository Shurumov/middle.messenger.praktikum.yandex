import { template } from './index.templ';
import * as Handlebars from 'handlebars';
import Block from '/src/utils/block/block';
import './styles.scss';
import { InputValidatorName } from '/src/utils/validation/input-validation';
import { ChatInput } from '/src/components/chat-input/chat-input';
import { chatsService } from '/src/services/chats.service';
import { StoreFields, storeManager } from '/src/utils/store-manager';
import '/src/styles/default.scss';
import { ChatListItem } from '/src/components/chat-list-item';
import { UsersList } from '/src/components/users-list/users-list';

export class ChatPage extends Block {
  constructor() {
    super({
      children: {
        InputMessage: new ChatInput({
          label: 'Имя',
          placeholder: 'Сообщение',
          name: 'message',
          replaceClassList: true,
          validators: {
            [InputValidatorName.required]: null,
          },
        }),
        UsersList: new UsersList()
      },
      events: {
        '#toggleUsers': {
          click: () => {
            storeManager.set(
              StoreFields.isUserListOpened,
              !storeManager.get(StoreFields.isUserListOpened)
            );
          }
        }
      },
      formFields: ['InputMessage'],
    }, 'div', ['chat-page']);

    storeManager.subscribe(StoreFields.chats, (chats) => {
      const addChildren = {};
      chats.forEach((chat, index) => {
        addChildren[`ChatListItem${index}`] = new ChatListItem({
          ...chat,
          events: {
            click: () => {
              storeManager.set(
                StoreFields.isUserListOpened,
                false
              );
              if (storeManager.get(StoreFields.currentChat)?.id !== chat.id) {
                chatsService.connectToChat(chat);
              }
            },
          }
        });
      });
      this.setProps({
        ...this.props,
        children: {
          ...this.props.children,
          ...addChildren
        },
        chats: chats.map((chat, index) => `ChatListItem${index}`)
      });
    });
    storeManager.subscribe(StoreFields.currentChat, (chat) => {
      this.setProps({
        ...this.props,
        currentChat: chat,
      });
    });
    chatsService.getChats();
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
