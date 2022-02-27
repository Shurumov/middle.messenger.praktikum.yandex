import { Message } from "./message.model";
import { User } from '/src/services/api/auth-api/user.model';
import { fetcher } from '/src/services/fetcher';

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
  unread_count: number;
  last_message: Message;
  token?: string;
}

class ChatsApi {
  getChats(): Promise<Chat[]> {
    return fetcher.get("/chats", {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  createChat(title: string): Promise<Chat[]> {
    return fetcher.post("/chats", {
      data: {
        title,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  deleteChat(chatId: number): Promise<void> {
    return fetcher.post("/chats", {
      data: {
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  getChatUsers(id: number): Promise<User[]> {
    return fetcher.get(`/chats/${id}/users`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  addUsersToChat(users: number[], chatId: number): Promise<User> {
    return fetcher.put(`/chats/users`, {
      data: {
        users,
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  deleteUserFromChat(users: number[], chatId: number): Promise<User> {
    return fetcher.delete(`/chats/users`, {
      data: {
        users,
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  getChatToken(chatId: number): Promise<{ token: string }> {
    return fetcher.post(`/chats/token/${chatId}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export const chatsApi = new ChatsApi();
