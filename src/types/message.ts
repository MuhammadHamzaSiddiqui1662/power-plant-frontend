import { MessageType } from "./MessageType";
import { User } from "./user";

export interface MessageData {
  _id: string;
  chatId: string;
  sender: User;
  content: string;
  type: MessageType;
  disabled: boolean;
  seen: boolean;
  seenAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
