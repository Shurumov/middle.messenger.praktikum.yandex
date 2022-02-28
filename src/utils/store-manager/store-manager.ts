import { helpers } from '/src/utils/helpers';
import { EventBus } from '/src/utils/event-bus';

export enum StoreFields {
  user = 'user',
  chats = 'chats',
  currentChat = 'currentChat',
  usersInChat = 'usersInChat',
  messages = 'messages',
  // search users fields
  isUserListOpened = 'isUserListOpened',
  searchUsers = 'searchUsers',
  searchUsersQuery = 'searchUsersQuery',
  showUsersInChat = 'showUsersInChat',
}

export class StoreManager {
  static instance: StoreManager;

  eventBus: EventBus;

  private _storeObject: Record<string, any> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private store: any;

  constructor() {
    this.eventBus = new EventBus();

    this.store = new Proxy<Record<string, any>>(this._storeObject, {
      get: (target, prop: string) => {
        return helpers.cloneDeep(target[prop]);
      },
      set: (target, prop: string, value) => {
        if (typeof value === 'function') {
          throw new Error('no functions in store');
        }

        const newValue = helpers.cloneDeep(value);
        target[prop] = newValue;
        if (this.eventBus.listeners[prop]) {
          this.eventBus.emit(prop, newValue);
        }

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });

    StoreManager.instance = this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  set(prop: string, value: any): void {
    this.store[prop] = value;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  get(path: StoreFields): any {
    return helpers.get(this.store, path);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  update(prop: StoreFields, value: any): void {
    this.store[prop] = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(prop: string, callback: (...args: any) => void): void {
    this.eventBus.on(prop, callback);
    if (typeof this.store[prop] !== 'undefined') {
      callback(this.store[prop]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unsubscribe(prop: string, callback: (...args: any) => void): void {
    this.eventBus.off(prop, callback);
  }
}

export const storeManager = new StoreManager();
