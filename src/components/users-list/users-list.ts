import { template } from './users-list.templ'
import Block from '/src/utils/block/block';
import * as Handlebars from 'handlebars';
import { Props } from '/src/utils/block/props.model';
import {
  StoreFields,
  storeManager
} from '/src/utils/store-manager/store-manager';
import './users-list.scss';

export class UsersList extends Block {
  constructor(props: Props = {}) {
    super(props, 'div', ['users-list']);
    storeManager.subscribe(StoreFields.usersInChat, (users) => {
      this.setProps({
        users,
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
