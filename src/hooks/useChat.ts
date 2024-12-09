import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { MessageData } from "../types/message";
import { useSocket } from "../providers/SocketProvider";
import { ChatData } from "../types/chat";
import { useGetChatByIdQuery, useGetMyChatsQuery } from "../services/chat/chat";
import { MessageType } from "../types/MessageType";
import { UserType } from "../types/user";
import { Review, ReviewType } from "../types/ReviewType";

export const useChats = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { user, userType } = useSelector((state: any) => state.auth);
  const userId: string = useMemo(() => user._id, [user]);
  const chatId = useSearchParams().get("chatId");
  const isUnhire = useSearchParams().get("unhire");
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const [chatDetails, setChatDetails] = useState<ChatData>();
  const { data: chats } = useGetMyChatsQuery(userType);
  const { data: _chatDetails } = useGetChatByIdQuery(chatId);
  const [messages, setMessages] = useState<MessageData[]>([]);

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
      socket?.emit("joinChat", { chatId });
      socket?.on("previousMessages", async (msgs: MessageData[]) => {
        console.log("msgs", msgs);
        setMessages(msgs);
        handleMarkMessagesAsSeen(chatId);
      });
    },
    [userId, socket, handleMarkMessagesAsSeen]
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
        // dispatch(pushMessage(message));
        setMessages((prev) => [...prev, message]);
        handleMarkMessagesAsSeen(chatId);
      } else {
        if (message.sender._id !== userId)
          // dispatch(increaseUnReadMessages(message));
          setChatList((prev) =>
            prev.map((chat) => {
              if (chat._id === message.chatId) {
                return { ...chat, unReadMessages: chat.unReadMessages + 1 };
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
      } catch (error) {
        console.log(`error --> ${error}`);
      }
    },
    [socket, user]
  );

  const handleCancelCloseDeal = useCallback(
    (messageId: string) => {
      try {
        // const { data: deleteMessageResponse, error } = await deleteMessage(
        //   messageId
        // );
        // if (error) return setError(error.message);

        socket.emit("deleteMessage", {
          messageId,
        });

        // let updatedMessageList = messages.filter((msg) => msg._id !== messageId);
        // setMessages(updatedMessageList);
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
    // dispatch(closeChat());
    setMessages([]);
  }, []);

  const handleSocketCleanUp = useCallback(() => {
    socket?.off("newMessage");
    socket?.off("previousMessages");
    socket?.off("messagesSeen");
    socket?.off("messageRemoved");
    socket?.off("dealClosed");
  }, [socket]);

  useEffect(() => {
    // dispatch(getChatsThunk(userId));
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
