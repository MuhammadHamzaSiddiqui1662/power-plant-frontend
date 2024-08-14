import { UserType } from "../types/user";

export const storeSessionToLocalStorage = (session: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("expires_at", session.expires_at);
    localStorage.setItem("expires_in", session.expires_in);
    localStorage.setItem("refresh_token", session.refresh_token);
    localStorage.setItem("user", JSON.stringify(session.user));
  }
};

export const getChatObject = (chat, _id, _type) => {
  if (_type == UserType.Innovator) {
    chat.innovator = _id;
  } else if (_type == UserType.Innvestor) {
    chat.investor = _id;
  } else if (_type == UserType.Broker) {
    chat.broker = _id;
  }
  return chat;
};
