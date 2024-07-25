export interface MessageData {
    chatId: string;
    sender: string;
    content: string;
    timestamp: Date;
    seen: boolean;
    seenAt: Date | null;
  }
  