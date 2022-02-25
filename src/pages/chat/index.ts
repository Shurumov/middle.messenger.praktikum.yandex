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
      },
      formFields: ['InputMessage'],
    }, 'div', ['chat-page']);

    storeManager.subscribe(StoreFields.chats, (chats) => {
      const children = {};
      chats.forEach((chat, index) => {
        children[`ChatListItem${index}`] = new ChatListItem({
          ...chat,
          events: {
            click: () => {
              if (storeManager.get(StoreFields.currentChat)?.id !== chat.id) {
                chatsService.connectToChat(chat);
              }
            },
          }
        });
      });
      this.setProps({
        ...this.props,
        children,
        chats: chats.map((chat, index) => `ChatListItem${index}`)
      });
    });
    chatsService.getChats();
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
