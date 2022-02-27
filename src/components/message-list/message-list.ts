import Block from '/src/utils/block/block';
import * as Handlebars from 'handlebars';
import { template } from './message-list.templ';
import { StoreFields, storeManager } from '/src/utils/store-manager';
import { Message } from '/src/services/api/chat-api/message.model';

export class MessageList extends Block {
  constructor() {
    super({ messages: [] }, 'div', ['chat__messages']);

    storeManager.subscribe(StoreFields.messages, (messages: Message[]) => {
      const { id } = storeManager.get(StoreFields.user);
      this.setProps({
        messages: messages.map(item => ({
          ...item,
          isOwn: item.user_id === id,
        }))
      });
    });

    storeManager.subscribe(StoreFields.currentChat, (chat) => this.setProps({ chat }));
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
