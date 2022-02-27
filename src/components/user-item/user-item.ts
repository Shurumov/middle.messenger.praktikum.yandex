import { template } from './user-item.templ';
import Block from '/src/utils/block/block';

import './user-item.scss'
import * as Handlebars from 'handlebars';
import { Props } from '/src/utils/block/props.model';

export class UserItem extends Block {
  constructor(props: Props) {
    super(props, "div", ["user-item"]);
  }
  render(): string {
    return Handlebars.compile(template)(this.props);
  }
}
