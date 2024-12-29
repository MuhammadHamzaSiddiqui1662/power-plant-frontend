import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { MessageData } from "../types/message";
import { useSocket } from "../providers/SocketProvider";
import { ChatData } from "../types/chat";
import { useGetChatByIdQuery, useGetMyChatsQuery } from "../services/chat/chat";
import { MessageType } from "../types/MessageType";
import { UserType } from "../types/user";
import { Review, ReviewType } from "../types/ReviewType";
import { useFireServerNotificationMutation } from "../services/notification/notification";

export const useChats = () => {
  const { socket } = useSocket();
  const { user, userType } = useSelector((state: any) => state.auth);
  const userId: string = useMemo(() => user._id, [user]);
  const chatId = useSearchParams().get("chatId");
  // const isUnhire = useSearchParams().get("unhire");
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const [chatDetails, setChatDetails] = useState<ChatData>();
  const { data: chats } = useGetMyChatsQuery(userType);
  const { data: _chatDetails } = useGetChatByIdQuery(chatId);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [fireServerNotification] = useFireServerNotificationMutation();

  useEffect(() => {
    if (chats) {
      setChatList(chats);
    }
  }, [chats]);

  useEffect(() => {
    if (_chatDetails) {
      setChatDetails(_chatDetails);
    }
  }, [_chatDetails]);

  const extractReceiver = useCallback(
    (chat: ChatData) => {
      if (userType === 0) {
        if (chat.investor)
          return { ...chat.investor, type: UserType.Innvestor };
        if (chat.broker) return { ...chat.broker, type: UserType.Broker };
      }
      if (userType === 1) {
        if (chat.innovator)
          return { ...chat.innovator, type: UserType.Innovator };
        if (chat.broker) return { ...chat.broker, type: UserType.Broker };
      }
      if (userType === 2) {
        if (chat.innovator)
          return { ...chat.innovator, type: UserType.Innovator };
        if (chat.investor)
          return { ...chat.investor, type: UserType.Innvestor };
      }
    },
    [userType]
  );

  const handleMarkMessagesAsSeen = useCallback(
    (chatId: string) => {
      socket?.emit("messagesSeen", { chatId });
    },
    [socket]
  );

  const handleMessagesSeenListner = useCallback(() => {
    socket?.on("messagesSeen", async (chatId: string) => {
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat._id === chatId) {
            return { ...chat, unReadMessages: 0 };
          }
          return chat;
        })
      );
    });
  }, [socket, setChatList]);

  const handleGetChatDetailsById = useCallback(
    async (chatId: string) => {
      if (chatDetails?._id)
        socket?.emit("leaveChat", { chatId: chatDetails._id });
      socket?.emit("joinChat", { chatId });
      socket?.on("previousMessages", async (msgs: MessageData[]) => {
        console.log("msgs", msgs);
        setMessages(msgs);
        handleMarkMessagesAsSeen(chatId);
      });
    },
    [socket, userId, chatDetails, handleMarkMessagesAsSeen]
  );

  const handleSendMessage = useCallback(
    (content: string, type: MessageType) => {
      socket?.emit("sendMessage", {
        chatId: chatDetails._id,
        content,
        type,
        senderId: user._id,
        receiverId: extractReceiver(chatDetails)._id,
      });
    },
    [socket, chatDetails, user, extractReceiver]
  );

  const handleNewMessagesListner = useCallback(() => {
    socket?.on("newMessage", async (message: MessageData) => {
      if (message.chatId == chatId) {
        setMessages((prev) => [...prev, message]);
        setChatList((prev) =>
          prev.map((chat) => {
            if (chat._id === message.chatId && message.content) {
              return { ...chat, lastMessage: message.content };
            }
            return chat;
          })
        );
        handleMarkMessagesAsSeen(chatId);
      } else {
        if (message.sender._id !== userId)
          setChatList((prev) =>
            prev.map((chat) => {
              if (chat._id === message.chatId) {
                return message.content
                  ? {
                      ...chat,
                      lastMessage: message.content,
                      unReadMessages: chat.unReadMessages + 1,
                    }
                  : { ...chat, unReadMessages: chat.unReadMessages + 1 };
              }
              return chat;
            })
          );
      }
    });
  }, [socket, userId, chatId, handleMarkMessagesAsSeen]);

  const handleRequestCloseDeal = useCallback(() => {
    try {
      if (chatDetails._id != "") {
        socket.emit("sendMessage", {
          chatId: chatDetails._id,
          type: MessageType.CloseChat,
          content: "Close Deal request.",
          senderId: user._id,
          receiverId: extractReceiver(chatDetails)._id,
        });
        fireServerNotification({
          messages: "Close Deal request.",
          imageUrl: user.imageUrl,
          link: `/chat?chatId=${chatDetails._id}`,
          userId: extractReceiver(chatDetails)._id,
        });
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  }, [socket, chatDetails, user, extractReceiver]);

  const handleRejectCloseDeal = useCallback(
    (chatId: string) => {
      try {
        socket.emit("rejectCloseDeal", {
          chatId,
          senderId: user._id,
        });
        fireServerNotification({
          messages: "Close Deal request rejected.",
          imageUrl: user.imageUrl,
          link: `/chat?chatId=${chatId}`,
          userId: extractReceiver(chatDetails)._id,
        });
      } catch (error) {
        console.log(`error --> ${error}`);
      }
    },
    [socket, user]
  );

  const handleCancelCloseDeal = useCallback(
    (messageId: string) => {
      try {
        socket.emit("deleteMessage", {
          messageId,
        });
        fireServerNotification({
          messages: "Close Deal request cancelled.",
          imageUrl: user.imageUrl,
          link: `/chat?chatId=${chatDetails._id}`,
          userId: extractReceiver(chatDetails)._id,
        });
      } catch (error) {
        console.log(`error --> ${error}`);
      }
    },
    [socket]
  );

  const handleAcceptCloseDeal = useCallback(
    (review: Review) => {
      const receiver = extractReceiver(chatDetails);
      const reviewType =
        receiver.type === UserType.Broker
          ? ReviewType.ReviewsAsBorker
          : receiver.type === UserType.Innvestor
          ? ReviewType.ReviewsAsInvestor
          : ReviewType.ReviewsAsInnovator;
      socket.emit("acceptCloseDeal", {
        chatId: chatDetails._id,
        receiverId: receiver._id,
        reviewType,
        review,
      });
      fireServerNotification({
        messages:
          "Close Deal request accepted. Give your review about the deal.",
        imageUrl: user.imageUrl,
        link: `/chat?chatId=${chatDetails._id}`,
        userId: receiver._id,
      });
    },
    [socket, chatDetails, extractReceiver]
  );

  const handleDealClosedListner = useCallback(() => {
    socket?.on("dealClosed", async (isDealClosed: boolean) => {
      if (isDealClosed) {
        setChatDetails((prev) => ({ ...prev, closed: true }));
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg.type === MessageType.CloseChat ? { ...msg, disabled: true } : msg
        )
      );
    });
  }, [socket, setMessages]);

  const handleCloseDeal = useCallback(
    (review: Review) => {
      const receiver = extractReceiver(chatDetails);
      const reviewType =
        receiver.type === UserType.Broker
          ? ReviewType.ReviewsAsBorker
          : receiver.type === UserType.Innvestor
          ? ReviewType.ReviewsAsInvestor
          : ReviewType.ReviewsAsInnovator;
      socket.emit("closeDeal", {
        chatId: chatDetails._id,
        receiverId: receiver._id,
        reviewType,
        review,
      });
      fireServerNotification({
        messages: "Deal closed.",
        imageUrl: user.imageUrl,
        link: `/chat?chatId=${chatDetails._id}`,
        userId: receiver._id,
      });
    },
    [socket, chatDetails, extractReceiver]
  );

  const handleReviewSubmit = useCallback(
    (review: Review) => {
      if (chatDetails.closed) handleCloseDeal(review);
      else handleAcceptCloseDeal(review);
    },
    [chatDetails, handleAcceptCloseDeal]
  );

  const handleMessageRemovedListner = useCallback(() => {
    socket.on("messageRemoved", (messageId: string) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });
  }, [socket, setMessages]);

  const handleCloseChat = useCallback(() => {
    if (chatDetails) socket?.emit("leaveChat", { chatId: chatDetails?._id });
    setMessages([]);
    setChatDetails(undefined);
  }, [socket, chatDetails, setMessages, setChatDetails]);

  const handleSocketCleanUp = useCallback(() => {
    socket?.off("newMessage");
    socket?.off("previousMessages");
    socket?.off("messagesSeen");
    socket?.off("messageRemoved");
    socket?.off("dealClosed");
  }, [socket]);

  useEffect(() => {
    if (chatId) handleGetChatDetailsById(chatId);
    else handleCloseChat();
    handleNewMessagesListner();
    handleMessagesSeenListner();
    handleMessageRemovedListner();
    handleDealClosedListner();

    // Cleanup the listener on component unmount
    return () => {
      handleSocketCleanUp();
    };
  }, [
    userId,
    chatId,
    extractReceiver,
    handleGetChatDetailsById,
    handleNewMessagesListner,
    handleMessagesSeenListner,
    handleMessageRemovedListner,
    handleCloseChat,
    handleSocketCleanUp,
  ]);

  return {
    chatList,
    chatDetails,
    messages,
    handleSendMessage,
    handleRequestCloseDeal,
    handleCancelCloseDeal,
    handleRejectCloseDeal,
    handleAcceptCloseDeal,
    handleReviewSubmit,
    handleCloseChat,
    extractReceiver,
  };
};
