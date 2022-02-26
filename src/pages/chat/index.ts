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
import { User } from '/src/services/api/users-api';
import { Chat } from '/src/services/api/chat-api';
import { BaseMessage, Message } from '/src/services/api/chat-api/message.model';
import { MessageList } from '/src/components/message-list/message-list';
import { authService } from '/src/services';
import { validateFormAndSubmit } from '/src/utils/validation/form-validation';

export class ChatPage extends Block {
  activeSocket: WebSocket;

  constructor() {
    authService.checkUserAuthed();

    const children = {
      ChatInput: new ChatInput({
        label: 'Имя',
        placeholder: 'Сообщение',
        name: 'message',
        replaceClassList: true,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      UsersList: new UsersList(),
      MessageList: new MessageList(),
    };

    super({
      children,
      events: {
        '#sendMessageForm': validateFormAndSubmit([children.ChatInput], ({ message }) => {
          children.ChatInput.setValue('');
          if (this.activeSocket) {
            this.activeSocket.send(
              JSON.stringify({
                content: message,
                time: new Date(),
                type: 'message',
              })
            );
          }
        })
        ,
        '#toggleUsers': {
          click: () => {
            storeManager.set(
              StoreFields.isUserListOpened,
              !storeManager.get(StoreFields.isUserListOpened)
            );
          }
        }
      },
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

    storeManager.subscribe(StoreFields.currentChat, (chat) => {
      const user = storeManager.get(StoreFields.user);
      if (chat && user) {
        this.openSocket(user, chat);
      }
    });
  }

  openSocket(user: User, chat: Chat): void {
    this.activeSocket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${chat.token}`
    );

    this.activeSocket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);

      if (response.type === 'user connected') {
        console.log(`User connected: `, response.content);
      } else {
        const usersInChat = storeManager.get(StoreFields.usersInChat);
        const currentUser = storeManager.get(StoreFields.user);

        const messages = Array.isArray(response)
          ? response.map((item) => this.getCustomMessage(item, currentUser, usersInChat)).reverse()
          : [this.getCustomMessage(response, currentUser, usersInChat)];

        storeManager.concatToValue(StoreFields.messages, messages);
      }
    });

    this.activeSocket.addEventListener('open', () => {
      this.activeSocket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    });

    this.activeSocket.addEventListener('close', () => {
      console.log('Соединение закрыто');
    });
  }

  getCustomMessage(message: BaseMessage, user: User, usersInChat: User[]): Message {
    const userInChat = usersInChat.find((item) => item.id === message.user_id);

    return {
      ...message,
      isCurrentUserMessage: user.id === message.user_id,
      userName: userInChat ? [userInChat.first_name, userInChat.second_name].join(' ') : 'NULL',
    };
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
