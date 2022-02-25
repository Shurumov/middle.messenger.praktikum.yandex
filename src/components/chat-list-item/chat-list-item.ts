import Block from '/src/utils/block/block';
import { template } from './chat-list-item.templ';
import { Props } from '/src/utils/block/props.model';
import * as Handlebars from 'handlebars';
import './chat-list-item.scss';
import { StoreFields, storeManager } from '/src/utils/store-manager';

export class ChatListItem extends Block {
  constructor(props: Props) {
    super(props, 'div', ['chat-list__item', ...(props.classNames ?? [])]);
    storeManager.subscribe(StoreFields.currentChat, (chat) => {
      this.setProps({
        ...this.props,
        isActive: chat.id === this.props.id
      })
    });
  }

  render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
