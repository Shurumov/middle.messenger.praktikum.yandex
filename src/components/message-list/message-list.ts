import Block from '/src/utils/block/block';
import * as Handlebars from 'handlebars';
import { template } from './message-list.templ';
import { StoreFields, storeManager } from '/src/utils/store-manager';
import { Message } from '/src/services/api/chat-api/message.model';
import { User } from '/src/services/api/users-api';

export class MessageList extends Block {
  currentUser?: User
  constructor() {
    super({ messages: [] }, 'div', ['chat__messages']);

    storeManager.subscribe(StoreFields.user, (user) =>{
      this.currentUser = user
    })

    storeManager.subscribe(StoreFields.messages, (messages: Message[]) => {
      this.setProps({
        messages: messages.map(item => ({
          ...item,
          isOwn: item.user_id === this.currentUser?.id,
        }))
      });
    });

    storeManager.subscribe(StoreFields.currentChat, (chat) => this.setProps({ chat }));
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
