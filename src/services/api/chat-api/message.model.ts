
export interface BaseMessage {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface Message extends BaseMessage {
  userName: string;
  isCurrentUserMessage: boolean;
}
