import Block from '/src/utils/block/block';
import { template } from './chat-list-item.templ';
import { Props } from '/src/utils/block/props.model';
import * as Handlebars from 'handlebars';
import './chat-list-item.scss';

export class ChatListItem extends Block {
  constructor(props: Props) {
    super(props, 'div', ['chat-list__item', ...(props.classNames ?? [])]);
  }

  render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
