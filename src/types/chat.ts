import { IP } from "./ip";
import { User } from "./user";

export interface ChatData {
  _id: string;
  innovator?: User;
  investor?: User;
  broker?: User;
  ip: IP;
  closed: boolean;
  open: boolean;
  reviewed: boolean;
  unReadMessages: number;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
