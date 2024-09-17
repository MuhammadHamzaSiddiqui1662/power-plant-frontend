"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Row,
  Col,
  Space,
  Card,
  Button,
  Input,
  ConfigProvider,
  Typography,
  Badge,
  Avatar,
  Drawer,
  FloatButton,
  Anchor,
} from "antd";

const { Link } = Anchor;
const { Title, Paragraph, Text } = Typography;
import Navbar from "../componants/Navbar";
import ReviewModal from "../componants/review/Modal";
import ChatModal from "../componants/chat/Modal";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import "./style.css";

import {
  useChatsMutation,
  useChatMutation,
  useUpdateChatMutation,
} from "../../services/chat/chat";

import { useDeleteMessageMutation } from "../../services/message/message";

import { MessageType } from "../../types/MessageType";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { BACKEND_SOCKET_URL } from "../../config/constants";
import ToastMessage from "../componants/Toast";

export default function Chat() {
  const messageWindowRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [receiverList, setReceiverList] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userType = useSelector((state) => state.auth.userType);
  const [message, setMessage] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [brokerType, setBrokerType] = useState(0);
  const chatId = useSearchParams().get("chatId");
  const isUnhire = useSearchParams().get("unhire");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatClickedIndex, setChatClickedIndex] = useState(0);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isReviewBtnClicked, setIsReviewBtnClicked] = useState(false);
  const router = useRouter();
  const [chats, { isLoading: isGetting }] = useChatsMutation();
  const [getChatById, { isLoading: isGettingById }] = useChatMutation();
  const [updateChat, { isLoading: isUpdating }] = useUpdateChatMutation();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const socket = io(BACKEND_SOCKET_URL);

  socket.on("newMessage", (userId, message) => {
    if (user._id == userId || brokerId === userId) {
      console.log("newMessage" + " " + message.content);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  });

  socket.on("messageRemoved", (userId, messageId) => {
    if (brokerId === userId) {
      let updatedMessageList = messages.filter((msg) => msg._id !== messageId);
      setMessages(updatedMessageList);
    }
  });

  socket.on("messageNotification", (chat) => {
    console.log(chat.unReadMessages);
    setReceiverList((prevChats) => {
      return prevChats.map((c) => {
        if (c._id === chat._id) {
          return {
            ...c,
            unReadMessages: chat.unReadMessages,
            lastMessage: chat.lastMessage,
          };
        }
        return c;
      });
    });
  });

  socket.on("messagesSeen", (chat) => {
    setReceiverList((prevChats) => {
      return prevChats.map((c) => {
        if (c._id === chat._id) {
          return {
            ...c,
            unReadMessages: chat.unReadMessages,
            lastMessage: chat.lastMessage,
          };
        }
        return c;
      });
    });
  });

  socket.on("userStatusChanged", (userId, online) => {
    setChatsList((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.receiver._id === userId) {
          return { ...chat, online: online };
        }
        return chat;
      });
    });
  });

  const handleOpenReviewModal = () => {
    setReviewModalVisible(true);
  };

  const ReviewButtonHandler = () => {
    setIsReviewBtnClicked(true);
    setReviewModalVisible(true);
  };

  const formatTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const refresh = () => {
    router.refresh();
    window.location.reload();
  };

  const closeDealMessageHandler = () => {
    try {
      if (selectedChat._id != "") {
        socket.emit("sendMessage", {
          chatId: selectedChat._id,
          senderId: user._id,
          type: MessageType.CloseChat,
          receiverId: selectedChat.receiver._id,
        });
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const sendReviewMessageHandler = (chatId, senderId, receiverId) => {
    try {
      if (chatId != "") {
        socket.emit("sendMessage", {
          chatId: chatId,
          senderId: senderId,
          type: MessageType.ReviewChat,
          receiverId: receiverId,
        });
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const chatClickHandler = async (index) => {
    await getChatByIdHandler(index);
    setChatClickedIndex(index);
  };

  const sendMessageHandler = (e) => {
    try {
      e.preventDefault();
      if (selectedChat._id != "") {
        socket.emit("sendMessage", {
          chatId: selectedChat._id,
          senderId: user._id,
          type: MessageType.Text,
          content: message,
          receiverId: selectedChat.receiver._id,
        });
        setMessage("");
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const extractReceivers = (chats) => {
    let _receiverList = [];
    try {
      if (userType == 0) {
        _receiverList = chats.map((ch) => ({
          _id: ch._id,
          receiver: ch.broker != null ? ch.broker : ch.investor,
          closed: ch.closed,
          unReadMessages: ch.unReadMessages,
          lastMessage: ch.lastMessage,
          open: ch.open,
          reviewed: ch.reviewed,
          ip: ch.ip,
          userType: ch.broker != null ? "broker" : "investor",
        }));
      }
      if (userType == 1) {
        _receiverList = chats.map((ch) => ({
          _id: ch._id,
          receiver: ch.broker != null ? ch.broker : ch.innovator,
          closed: ch.closed,
          unReadMessages: ch.unReadMessages,
          lastMessage: ch.lastMessage,
          open: ch.open,
          reviewed: ch.reviewed,
          ip: ch.ip,
          userType: ch.broker != null ? "broker" : "innovator",
        }));
      }
      if (userType == 2) {
        _receiverList = chats.map((ch) => ({
          _id: ch._id,
          receiver: ch.innovator != null ? ch.innovator : ch.investor,
          closed: ch.closed,
          unReadMessages: ch.unReadMessages,
          lastMessage: ch.lastMessage,
          open: ch.open,
          reviewed: ch.reviewed,
          ip: ch.ip,
          userType: ch.innovator != null ? "innovator" : "investor",
        }));
      }
      setReceiverList(_receiverList);
    } catch (error) {
      console.log(error);
    }
    return _receiverList;
  };

  const extractReceiver = (chatObject) => {
    try {
      let _receiver = {};

      if (userType == 0) {
        setBrokerType(chatObject.broker != null ? 2 : 1);
        _receiver = {
          _id: chatObject._id,
          receiver:
            chatObject.broker != null ? chatObject.broker : chatObject.investor,
          closed: chatObject.closed,
          unReadMessages: chatObject.unReadMessages,
          lastMessage: chatObject.lastMessage,
          open: chatObject.open,
          reviewed: chatObject.reviewed,
          ip: chatObject.ip,
          userType: chatObject.broker != null ? "broker" : "investor",
        };
      }
      if (userType == 1) {
        setBrokerType(chatObject.broker != null ? 2 : 0);
        _receiver = {
          _id: chatObject._id,
          receiver:
            chatObject.broker != null
              ? chatObject.broker
              : chatObject.innovator,
          closed: chatObject.closed,
          unReadMessages: chatObject.unReadMessages,
          lastMessage: chatObject.lastMessage,
          open: chatObject.open,
          reviewed: chatObject.reviewed,
          ip: chatObject.ip,
          userType: chatObject.broker != null ? "broker" : "innovator",
        };
      }
      if (userType == 2) {
        setBrokerType(chatObject.innovator != null ? 0 : 1);
        _receiver = {
          _id: chatObject._id,
          receiver:
            chatObject.innovator != null
              ? chatObject.innovator
              : chatObject.investor,
          closed: chatObject.closed,
          unReadMessages: chatObject.unReadMessages,
          lastMessage: chatObject.lastMessage,
          open: chatObject.open,
          reviewed: chatObject.reviewed,
          ip: chatObject.ip,
          userType: chatObject.innovator != null ? "innovator" : "investor",
        };
      }

      return _receiver;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChatsHandler = async () => {
    try {
      const { data: getAllChatsResponse, error } = await chats(userType);

      if (error) return setError(error.message);

      if (getAllChatsResponse[0]?._id) {
        let recList = extractReceivers(getAllChatsResponse);
        if (chatId) {
          await chatClickHandler(
            getAllChatsResponse.find((res) => res._id == chatId)._id
          );
          setSelectedChat(recList.find((res) => res._id == chatId));
        }
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const getChatByIdHandler = async (Id) => {
    try {
      let unseenMessageIds = [];
      const { data: getChatByIdResponse, error } = await getChatById(Id);
      if (error) return setError(error.message);
      if (getChatByIdResponse._id) {
        let receiver = extractReceiver(getChatByIdResponse);
        setSelectedChat(receiver);
        router.replace(`/chat?chatId=${getChatByIdResponse._id}`);
        console.log(receiver.receiver._id);
        setBrokerId(receiver.receiver._id);
        socket.emit("joinChat", {
          chatId: getChatByIdResponse._id,
          userId: user._id,
        });
        socket.on("previousMessages", (msgs) => {
          setMessages(msgs);
          unseenMessageIds = msgs.filter((m) => !m.seen).map((m) => m._id);
          unseenMessageIds.forEach((id) =>
            socket.emit("messageSeen", {
              messageId: id,
              userId: user._id,
            })
          );
        });
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const getChatDetails = async (Id) => {
    let receiver = null;
    try {
      const { data: getChatByIdResponse, error } = await getChatById(Id);
      if (error) return setError(error.message);
      if (getChatByIdResponse._id) {
        receiver = extractReceiver(getChatByIdResponse);
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
    return receiver;
  };

  const rejectCloseDealHandler = async (chat) => {
    try {
      let newChatObject = { ...chat, open: true };
      const { data: updateChatResponse, error } = await updateChat(
        newChatObject
      );
      if (error) return setError(error.message);
      console.log(updateChatResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const cancelCloseDealHandler = async (messageId) => {
    try {
      const { data: deleteMessageResponse, error } = await deleteMessage(
        messageId
      );
      if (error) return setError(error.message);

      socket.emit("deleteMessage", {
        chatId: selectedChat._id,
        senderId: user._id,
        type: MessageType.CloseChat,
        receiverId: selectedChat.receiver._id,
        messageId: messageId,
      });

      let updatedMessageList = messages.filter((msg) => msg._id !== messageId);
      setMessages(updatedMessageList);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  useEffect(() => {
    socket.emit("userOnline", user._id);
    socket.emit("joinNotificationRoom", { userId: user._id });

    getAllChatsHandler();

    if (isUnhire === "true") {
      getChatDetails(chatId)
        .then((res) => {
          if (res != null) {
            socket.emit("sendMessage", {
              chatId: res._id,
              senderId: user._id,
              type: MessageType.CloseChat,
              receiverId: res.receiver._id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    socket.on("messageSeen", ({ messageId, userId, seenAt }) => {
      console.log(`Message ${messageId} seen by user ${userId} at ${seenAt}`);
    });

    socket.on("dealClosed", async () => {
      console.log(`Deal Closed`);
      ToastMessage({ message: "Deal Closed!", type: "success" });
    });

    return () => {
      socket.emit("userOffline", user._id);
      socket.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (messageWindowRef.current)
      messageWindowRef.current.scrollTop =
        messageWindowRef.current.scrollHeight;
  }, [messageWindowRef, messages]);

  if (isMobile) {
    return (
      <>
        <ReviewModal
          visible={reviewModalVisible}
          setVisible={setReviewModalVisible}
          sendReviewMessage={sendReviewMessageHandler}
          brokerId={brokerId}
          userType={brokerType}
          isReviewBtnClicked={isReviewBtnClicked}
          chat={selectedChat}
          refresh={refresh}
        />

        <Navbar />
        <section className="py-28 section">
          <Drawer
            title="Chats"
            placement="left"
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <Col xs={23} sm={23} md={22} lg={7} xl={6} xll={6}>
              <h1 className="f-32 b-6xx">Messages</h1>

              <div className="chat-container">
                {receiverList.map((chat, index) => (
                  <Card
                    key={chat._id}
                    className={`m-40 chat-card ${
                      chatClickedIndex === chat._id ? "active" : ""
                    }`}
                    onClick={() => chatClickHandler(chat._id)}
                  >
                    <Badge.Ribbon text={chat.userType} color="purple">
                      <Row className="pd-12">
                        <Col xs={3} sm={3} md={3} lg={5} xl={2} xxl={1}>
                          {chat.receiver != null &&
                          chat.receiver.online === true ? (
                            <Badge
                              status="success"
                              dot
                              offset={[-5, 45]}
                              className="pd-5"
                            >
                              <Avatar
                                src={chat.receiver.imageUrl}
                                shape="circle"
                                className="h-5x w-5x"
                              ></Avatar>
                            </Badge>
                          ) : (
                            <Avatar
                              src={chat.receiver.imageUrl}
                              shape="circle"
                              className="h-5x w-5x"
                            >
                              {" "}
                            </Avatar>
                          )}
                        </Col>

                        <Col xs={2} sm={2} md={3} lg={0} xl={3} xxl={2}></Col>

                        <Col xs={13} sm={10} md={8} lg={8} xl={8} xxl={16}>
                          <text className="f-16 b-7xx">
                            {chat.receiver.name}
                          </text>

                          <br />
                          <Typography.Text
                            className="f-12 c-grey"
                            ellipsis={{ rows: 1 }}
                          >
                            {chat.lastMessage}
                          </Typography.Text>
                          {/* <text className="f-12 c-grey">{chat.lastMessage}</text> */}
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={1} xl={3} xxl={3}>
                          {chat.unReadMessages > 0 ? (
                            <Badge
                              color="green"
                              count={chat.unReadMessages}
                              offset={[80, 20]}
                            ></Badge>
                          ) : (
                            <text></text>
                          )}
                        </Col>
                      </Row>
                    </Badge.Ribbon>
                  </Card>
                ))}
              </div>
            </Col>
          </Drawer>

          <Row justify={"center"}>
            <Col xs={22} md={22} lg={15} xl={13} xll={12}>
              <Card className="custom-border">
                {selectedChat == null ? (
                  "Loading"
                ) : (
                  <div className="pd-24">
                    <Row>
                      <Col xs={{ span: 1 }}>
                        <Avatar
                          className="h-4x w-4x"
                          src={selectedChat.receiver.imageUrl}
                          shape="circle"
                        />
                      </Col>

                      <Col xs={3} sm={3} md={6} lg={5} className="pd-0-15">
                        <a
                          className="anchor-design"
                          href={`/profile/${
                            selectedChat.receiver._id
                          }?userType=${"broker" ? 2 : "investor" ? 1 : 0}`}
                        >
                          {" "}
                          <text className="f-16 b-7xx">
                            {selectedChat.receiver.name}
                          </text>
                        </a>
                        <br />
                        <a
                          className="anchor-design"
                          href={`/details/${selectedChat.ip._id}`}
                        >
                          <Typography.Text
                            className="f-16 b-7xx"
                            ellipsis={{ row: 1 }}
                          >
                            {selectedChat.ip.name}
                          </Typography.Text>
                        </a>
                      </Col>

                      <Col xs={10} sm={10} lg={12} xl={11}></Col>

                      <Col xs={3} sm={3} md={3} lg={2} xl={3} xxl={3}>
                        <Button
                          disabled={
                            selectedChat != null && selectedChat.closed
                              ? true
                              : false
                          }
                          className="close-deal-btn"
                          onClick={closeDealMessageHandler}
                        >
                          <img src="images/payment/closeDeal.png" />
                          <text className="f-16 b-6xx"> Close Deal</text>
                        </Button>
                      </Col>

                      <Col lg={1} xl={1}></Col>

                      <Col xs={3} sm={3} md={3} lg={2} xl={1} xxl={1}>
                        <Button
                          className="i-btn"
                          type="success"
                          shape="circle"
                          size="small"
                        >
                          <text className="c-white">i</text>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
                <div className="divider"></div>
                {messages.length === 0 ? (
                  <div className="message-container"></div>
                ) : (
                  <div className="message-container" ref={messageWindowRef}>
                    {messages.map((message, index) => (
                      <div key={index}>
                        {message.sender._id === user._id ? (
                          <div className="pd-24">
                            {message.type === MessageType.CloseChat ? (
                              <Row justify={"end"}>
                                <Col xs={{ span: 9 }}>
                                  <Card className={"message"}>
                                    <div className="deal-close">
                                      <Typography>
                                        <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                        <br />
                                        <Text className="c-white f-42 b-7xx">
                                          DEAL CLOSE
                                        </Text>
                                      </Typography>
                                    </div>

                                    {message.sender._id === user._id ? (
                                      <div className="text-center">
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-cancel-btn"
                                            onClick={() =>
                                              cancelCloseDealHandler(
                                                message._id
                                              )
                                            }
                                            disabled={
                                              selectedChat.closed ? true : false
                                            }
                                          >
                                            <text className="f-18 b-5xx">
                                              Cancel
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      </div>
                                    ) : (
                                      <div className="text-center">
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-btn br-right"
                                            onClick={() =>
                                              rejectCloseDealHandler(
                                                selectedChat
                                              )
                                            }
                                          >
                                            <text className="f-18 b-5xx">
                                              Reject
                                            </text>
                                          </Button>
                                        </ConfigProvider>

                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-btn"
                                            disabled={
                                              selectedChat.reviewed ||
                                              selectedChat.closed
                                            }
                                            onClick={handleOpenReviewModal}
                                          >
                                            <text className="f-18 b-5xx">
                                              Accept
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      </div>
                                    )}
                                  </Card>
                                  <text className="fl-r f-9 m-0-80">
                                    {formatTime(message.createdAt)}
                                  </text>
                                </Col>
                                <Col xs={{ span: 1 }}>
                                  <Avatar
                                    src={message.sender.imageUrl}
                                    shape="circle"
                                  />
                                </Col>
                              </Row>
                            ) : (
                              <div>
                                {message.type === MessageType.ReviewChat ? (
                                  <Row justify={"end"}>
                                    <Col xs={{ span: 9 }}>
                                      <Card className={"message"}>
                                        <div className="deal-close">
                                          <Typography>
                                            <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                            <br />
                                            <Text className="f-42 b-7xx c-white">
                                              DEAL CLOSE
                                            </Text>
                                          </Typography>
                                        </div>
                                        <div className="text-center">
                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-cancel-btn"
                                              disabled={
                                                message.sender._id ===
                                                  user._id ||
                                                selectedChat.closed
                                                  ? true
                                                  : false
                                              }
                                              onClick={ReviewButtonHandler}
                                            >
                                              <text className="f-18 b-5xx">
                                                Review
                                              </text>
                                            </Button>
                                          </ConfigProvider>
                                        </div>
                                      </Card>
                                      <text className="f-9">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>
                                    <Col xs={{ span: 1 }} className="m-0-20">
                                      <Avatar
                                        // src={message.sender.imageUrl}
                                        // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                        shape="circle"
                                      />
                                    </Col>
                                  </Row>
                                ) : (
                                  <Row justify={"end"}>
                                    <Col xs={{ span: 9 }}>
                                      <Card className={"pd-18 message sender"}>
                                        <Typography>
                                          <Text className="c-white f-12">
                                            {message.content}
                                          </Text>
                                        </Typography>
                                      </Card>
                                      <text className="fl-r f-9 m-0-80">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>

                                    <Col xs={{ span: 1 }}>
                                      <Avatar
                                        src={message.sender.imageUrl}
                                        shape="circle"
                                      />
                                    </Col>
                                  </Row>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="pd-24">
                            {message.type === MessageType.CloseChat ? (
                              <Row justify={"start"}>
                                <Col xs={{ span: 1 }} className="m-0-20">
                                  <Avatar
                                    src={message.sender.imageUrl}
                                    shape="circle"
                                  />
                                </Col>

                                <Col xs={{ span: 9 }}>
                                  <Card className={"message"}>
                                    <div className="deal-close">
                                      <Typography>
                                        <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                        <br />
                                        <Text className="f-42 b-7xx c-white">
                                          DEAL CLOSE
                                        </Text>
                                      </Typography>
                                    </div>

                                    {message.sender._id === user._id ? (
                                      <div className="text-center">
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-cancel-btn"
                                            onClick={() =>
                                              cancelCloseDealHandler(
                                                message._id
                                              )
                                            }
                                            disabled={
                                              selectedChat.closed ? true : false
                                            }
                                          >
                                            <text className="f-18 b-5xx">
                                              Cancel
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      </div>
                                    ) : (
                                      <div className="text-center">
                                        {message.type ===
                                        MessageType.ReviewChat ? (
                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-cancel-btn"
                                              disabled={
                                                message.sender._id ===
                                                  user._id ||
                                                selectedChat.closed
                                                  ? true
                                                  : false
                                              }
                                              onClick={ReviewButtonHandler}
                                            >
                                              <text className="f-18 b-5xx">
                                                Review
                                              </text>
                                            </Button>
                                          </ConfigProvider>
                                        ) : (
                                          <>
                                            <ConfigProvider
                                              wave={{ disabled: true }}
                                            >
                                              <Button
                                                className="deal-close-btn br-right"
                                                onClick={() =>
                                                  rejectCloseDealHandler(
                                                    selectedChat
                                                  )
                                                }
                                              >
                                                <text className="f-18 b-5xx">
                                                  Reject
                                                </text>
                                              </Button>
                                            </ConfigProvider>

                                            <ConfigProvider
                                              wave={{ disabled: true }}
                                            >
                                              <Button
                                                className="deal-close-btn"
                                                disabled={
                                                  selectedChat.reviewed ||
                                                  selectedChat.closed
                                                }
                                                onClick={handleOpenReviewModal}
                                              >
                                                <text className="f-18 b-5xx">
                                                  Accept
                                                </text>
                                              </Button>
                                            </ConfigProvider>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </Card>

                                  <text className="f-9">
                                    {formatTime(message.createdAt)}
                                  </text>
                                </Col>
                              </Row>
                            ) : (
                              <div>
                                {message.type === MessageType.ReviewChat ? (
                                  <Row justify={"start"}>
                                    <Col xs={{ span: 1 }} className="m-0-20">
                                      <Avatar
                                        // src={message.sender.imageUrl}
                                        // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                        shape="circle"
                                      />
                                    </Col>
                                    <Col xs={{ span: 9 }}>
                                      <Card className={"message"}>
                                        <div className="deal-close">
                                          <Typography>
                                            <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                            <br />
                                            <Text className="f-42 b-7xx c-white">
                                              DEAL CLOSE
                                            </Text>
                                          </Typography>
                                        </div>
                                        <div className="text-center">
                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-cancel-btn"
                                              disabled={
                                                message.sender._id ===
                                                  user._id ||
                                                selectedChat.closed
                                                  ? true
                                                  : false
                                              }
                                              onClick={ReviewButtonHandler}
                                            >
                                              <text className="f-18 b-5xx">
                                                Review
                                              </text>
                                            </Button>
                                          </ConfigProvider>
                                        </div>
                                      </Card>
                                      <text className="f-9">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>
                                  </Row>
                                ) : (
                                  <Row justify={"start"}>
                                    <Col xs={{ span: 1 }} className="m-0-20">
                                      <Avatar
                                        src={message.sender.imageUrl}
                                        shape="circle"
                                      />
                                    </Col>

                                    <Col xs={{ span: 9 }}>
                                      <Card
                                        className={"pd-18 message receiver"}
                                      >
                                        <Typography>
                                          <Text className="f-12">
                                            {message.content}
                                          </Text>
                                        </Typography>
                                      </Card>
                                      <text className="f-9">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>
                                  </Row>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pd-24 mt-1x">
                  <Space.Compact className="message-box">
                    <Input
                      value={message}
                      onChange={handleMessageChange}
                      className="input-message"
                      placeholder="Type your messages here"
                    ></Input>

                    <ConfigProvider wave={{ disabled: true }}>
                      <Button className="pin-button">
                        <img
                          className="file-pin-image"
                          src="images/payment/filePin.png"
                        />
                      </Button>
                    </ConfigProvider>

                    <ConfigProvider wave={{ disabled: true }}>
                      <Button className="send-btn" onClick={sendMessageHandler}>
                        <img
                          className="send-btn-image"
                          src="images/payment/sendbtn.png"
                        />
                      </Button>
                    </ConfigProvider>
                  </Space.Compact>
                </div>
              </Card>
            </Col>
          </Row>

          <FloatButton
            icon={"+"}
            type={"success"}
            className="chat-button"
            onClick={() => setVisible(true)}
          ></FloatButton>
        </section>
      </>
    );
  }

  return (
    <>
      <ReviewModal
        visible={reviewModalVisible}
        setVisible={setReviewModalVisible}
        sendReviewMessage={sendReviewMessageHandler}
        brokerId={brokerId}
        userType={brokerType}
        isReviewBtnClicked={isReviewBtnClicked}
        chat={selectedChat}
        refresh={refresh}
      />

      <Navbar />
      <section className="section">
        <Row justify={"center"} className="h-full" style={{ gap: 32 }}>
          <Col
            xs={22}
            md={22}
            lg={6}
            xl={6}
            xll={6}
            className="h-full border custom-border rounded-2xl"
          >
            <div className="p-4 h-full max-h-full flex flex-col overflow-y-auto gap-4">
              <h1 className="f-32 b-6xx">Messages</h1>

              <div className="chat-container h-full flex flex-col gap-2">
                {receiverList.map((chat, index) => (
                  <Card
                    key={chat._id}
                    className={`chat-card ${
                      chatClickedIndex === chat._id ? "active" : ""
                    }`}
                    onClick={() => chatClickHandler(chat._id)}
                  >
                    <Badge.Ribbon text={chat.userType} color="purple">
                      <Row className="pd-12">
                        <Col xs={3} sm={3} md={3} lg={5} xl={2} xxl={1}>
                          {chat.receiver != null &&
                          chat.receiver.online === true ? (
                            <Badge status="success" dot offset={[-6, 36]}>
                              <Avatar
                                // src={chat.receiver.imageUrl}
                                // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                shape="circle"
                                className="h-5x w-5x"
                              ></Avatar>
                            </Badge>
                          ) : (
                            <Avatar
                              // src={chat.receiver.imageUrl}
                              // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                              shape="circle"
                              className="h-5x w-5x"
                            >
                              {" "}
                            </Avatar>
                          )}
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={2} xl={3} xxl={2}></Col>

                        <Col xs={3} sm={3} md={3} lg={8} xl={8} xxl={16}>
                          <text className="f-16 b-7xx">
                            {chat.receiver.name}
                          </text>

                          <br />
                          <Typography.Text
                            className="f-12 c-grey"
                            ellipsis={{ rows: 1 }}
                          >
                            {chat.lastMessage}
                          </Typography.Text>
                          {/* //  <text className="f-12 c-grey">{chat.lastMessage}</text> */}
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={1} xl={3} xxl={3}>
                          {chat.unReadMessages > 0 ? (
                            <Badge
                              color="green"
                              count={chat.unReadMessages}
                              offset={[80, 20]}
                            ></Badge>
                          ) : (
                            <text></text>
                          )}
                        </Col>
                      </Row>
                    </Badge.Ribbon>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
          {selectedChat == null ? (
            <Col
              xs={22}
              md={22}
              lg={16}
              xl={16}
              xll={12}
              className="h-full border custom-border rounded-2xl flex items-center justify-center"
            >
              <Title className="text-slate-400">Select Any Chat</Title>
            </Col>
          ) : (
            <Col
              xs={22}
              md={22}
              lg={16}
              xl={16}
              xll={12}
              className="h-full border custom-border rounded-2xl flex flex-col"
            >
              <div className="pd-24">
                <Row>
                  <Col xs={{ span: 1 }}>
                    <Avatar
                      className="h-4x w-4x"
                      // src={selectedChat.receiver.imageUrl}
                      // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                      shape="circle"
                    />
                  </Col>

                  <Col xs={3} sm={3} md={6} lg={5} className="pd-0-15">
                    <a
                      className="anchor-design"
                      href={`/profile/${selectedChat.receiver._id}?userType=${
                        "broker" ? 2 : "investor" ? 1 : 0
                      }`}
                    >
                      {" "}
                      <text className="f-16 b-7xx">
                        {selectedChat.receiver.name}
                      </text>
                    </a>
                    <br />
                    <a
                      className="anchor-design"
                      href={`/details/${selectedChat.ip._id}`}
                    >
                      <Typography.Text
                        className="f-16 b-7xx"
                        ellipsis={{ rows: 1 }}
                      >
                        {selectedChat.ip.name}
                      </Typography.Text>
                    </a>
                  </Col>

                  <Col lg={12} xl={11}></Col>

                  <Col xs={3} sm={3} md={3} lg={2} xl={3} xxl={3}>
                    <Button
                      disabled={
                        selectedChat != null && selectedChat.closed
                          ? true
                          : false
                      }
                      className="close-deal-btn"
                      onClick={closeDealMessageHandler}
                    >
                      <img src="images/payment/closeDeal.png" />
                      <text className="f-16 b-6xx"> Close Deal</text>
                    </Button>
                  </Col>

                  <Col lg={1} xl={1}></Col>

                  <Col xs={3} sm={3} md={3} lg={2} xl={1} xxl={1}>
                    <Button
                      className="i-btn"
                      type="success"
                      shape="circle"
                      size="small"
                    >
                      <text className="c-white">i</text>
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="divider"></div>
              {messages.length === 0 ? (
                <div className="message-container"></div>
              ) : (
                <div className="message-container" ref={messageWindowRef}>
                  {messages.map((message, index) => (
                    <div key={index}>
                      {message.sender._id === user._id ? (
                        <div className="pd-24">
                          {message.type === MessageType.CloseChat ? (
                            <Row justify={"end"}>
                              <Col xs={{ span: 9 }}>
                                <Card className={"message"}>
                                  <div className="deal-close">
                                    <Typography>
                                      <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                      <br />
                                      <Text className="c-white f-42 b-7xx">
                                        DEAL CLOSE
                                      </Text>
                                    </Typography>
                                  </div>
                                  {message.sender._id === user._id ? (
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button
                                          className="deal-close-cancel-btn"
                                          onClick={() =>
                                            cancelCloseDealHandler(message._id)
                                          }
                                          disabled={
                                            selectedChat.closed ? true : false
                                          }
                                        >
                                          <text className="f-18 b-5xx">
                                            Cancel
                                          </text>
                                        </Button>
                                      </ConfigProvider>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      {message.type ===
                                      MessageType.ReviewChat ? (
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-btn br-right"
                                            disabled={
                                              message.sender._id === user._id ||
                                              selectedChat.closed
                                                ? true
                                                : false
                                            }
                                            onClick={ReviewButtonHandler}
                                          >
                                            <text className="f-18 b-5xx">
                                              Review
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      ) : (
                                        <>
                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-btn br-right"
                                              disabled={
                                                selectedChat.reviewed ||
                                                selectedChat.closed
                                              }
                                              onClick={() =>
                                                rejectCloseDealHandler(
                                                  selectedChat
                                                )
                                              }
                                            >
                                              <text className="f-18 b-5xx">
                                                Reject
                                              </text>
                                            </Button>
                                          </ConfigProvider>

                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-btn"
                                              disabled={
                                                selectedChat.reviewed ||
                                                selectedChat.closed
                                              }
                                              onClick={handleOpenReviewModal}
                                            >
                                              <text className="f-18 b-5xx">
                                                Accept
                                              </text>
                                            </Button>
                                          </ConfigProvider>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </Card>
                                <text className="fl-r f-9 m-0-80">
                                  {formatTime(message.createdAt)}
                                </text>
                              </Col>

                              <Col xs={{ span: 1 }}>
                                <Avatar
                                  // src={message.sender.imageUrl}
                                  // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                  shape="circle"
                                />
                              </Col>
                            </Row>
                          ) : (
                            <div>
                              {message.type === MessageType.ReviewChat ? (
                                <Row justify={"end"}>
                                  <Col xs={{ span: 9 }}>
                                    <Card className={"message"}>
                                      <div className="deal-close">
                                        <Typography>
                                          <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                          <br />
                                          <Text className="f-42 b-7xx c-white">
                                            DEAL CLOSE
                                          </Text>
                                        </Typography>
                                      </div>
                                      <div className="text-center">
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-cancel-btn"
                                            disabled={
                                              message.sender._id === user._id ||
                                              selectedChat.closed
                                                ? true
                                                : false
                                            }
                                            onClick={ReviewButtonHandler}
                                          >
                                            <text className="f-18 b-5xx">
                                              Review
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      </div>
                                    </Card>
                                    <text className="f-9">
                                      {formatTime(message.createdAt)}
                                    </text>
                                  </Col>
                                  <Col xs={{ span: 1 }} className="m-0-20">
                                    <Avatar
                                      // src={message.sender.imageUrl}
                                      // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                      shape="circle"
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                <Row justify={"end"}>
                                  <Col xs={{ span: 9 }}>
                                    <Card className={"pd-18 message sender"}>
                                      <Typography>
                                        <Text className="c-white f-12">
                                          {message.content}
                                        </Text>
                                      </Typography>
                                    </Card>
                                    <text className="fl-r f-9 m-0-80">
                                      {formatTime(message.createdAt)}
                                    </text>
                                  </Col>

                                  <Col xs={{ span: 1 }}>
                                    <Avatar
                                      // src={message.sender.imageUrl}
                                      // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                      shape="circle"
                                    />
                                  </Col>
                                </Row>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="pd-24">
                          {message.type === MessageType.CloseChat ? (
                            <Row justify={"start"}>
                              <Col xs={{ span: 1 }} className="m-0-20">
                                <Avatar
                                  // src={message.sender.imageUrl}
                                  // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                  shape="circle"
                                />
                              </Col>
                              <Col xs={{ span: 9 }}>
                                <Card className={"message"}>
                                  <div className="deal-close">
                                    <Typography>
                                      <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                      <br />
                                      <Text className="f-42 b-7xx c-white">
                                        DEAL CLOSE
                                      </Text>
                                    </Typography>
                                  </div>

                                  {message.sender._id === user._id ? (
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button
                                          className="deal-close-cancel-btn"
                                          onClick={() =>
                                            cancelCloseDealHandler(message._id)
                                          }
                                          disabled={
                                            selectedChat.closed ? true : false
                                          }
                                        >
                                          <text className="f-18 b-5xx">
                                            Cancel
                                          </text>
                                        </Button>
                                      </ConfigProvider>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <>
                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-btn br-right"
                                            disabled={
                                              selectedChat.reviewed ||
                                              selectedChat.closed
                                            }
                                            onClick={() =>
                                              rejectCloseDealHandler(
                                                selectedChat
                                              )
                                            }
                                          >
                                            <text className="f-18 b-5xx">
                                              Reject
                                            </text>
                                          </Button>
                                        </ConfigProvider>

                                        <ConfigProvider
                                          wave={{ disabled: true }}
                                        >
                                          <Button
                                            className="deal-close-btn"
                                            disabled={
                                              selectedChat.reviewed ||
                                              selectedChat.closed
                                            }
                                            onClick={handleOpenReviewModal}
                                          >
                                            <text className="f-18 b-5xx">
                                              Accept
                                            </text>
                                          </Button>
                                        </ConfigProvider>
                                      </>
                                    </div>
                                  )}
                                </Card>

                                <text className="f-9">
                                  {formatTime(message.createdAt)}
                                </text>
                              </Col>
                            </Row>
                          ) : (
                            <div>
                              {message.type === MessageType.ReviewChat ? (
                                <>
                                  <Row justify={"start"}>
                                    <Col xs={{ span: 1 }} className="m-0-20">
                                      <Avatar
                                        // src={message.sender.imageUrl}
                                        // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                        shape="circle"
                                      />
                                    </Col>
                                    <Col xs={{ span: 9 }}>
                                      <Card className={"message"}>
                                        <div className="deal-close">
                                          <Typography>
                                            <Text className="c-white f-9">{`${message.sender.name} has sent you Deal Close offer:`}</Text>
                                            <br />
                                            <Text className="f-42 b-7xx c-white">
                                              DEAL CLOSE
                                            </Text>
                                          </Typography>
                                        </div>
                                        <div className="text-center">
                                          <ConfigProvider
                                            wave={{ disabled: true }}
                                          >
                                            <Button
                                              className="deal-close-cancel-btn"
                                              disabled={
                                                message.sender._id ===
                                                  user._id ||
                                                selectedChat.closed
                                                  ? true
                                                  : false
                                              }
                                              onClick={ReviewButtonHandler}
                                            >
                                              <text className="f-18 b-5xx">
                                                Review
                                              </text>
                                            </Button>
                                          </ConfigProvider>
                                        </div>
                                      </Card>
                                      <text className="f-9">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>
                                  </Row>
                                </>
                              ) : (
                                <>
                                  <Row justify={"start"}>
                                    <Col xs={{ span: 1 }} className="m-0-20">
                                      <Avatar
                                        // src={message.sender.imageUrl}
                                        // src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                                        shape="circle"
                                      />
                                    </Col>

                                    <Col xs={{ span: 9 }}>
                                      <Card
                                        className={"pd-18 message receiver"}
                                      >
                                        <Typography>
                                          <Text className="f-12">
                                            {message.content}
                                          </Text>
                                        </Typography>
                                      </Card>
                                      <text className="f-9">
                                        {formatTime(message.createdAt)}
                                      </text>
                                    </Col>
                                  </Row>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="pd-24 mt-1x">
                <Box
                  className="message-box flex"
                  component={"form"}
                  onSubmit={sendMessageHandler}
                >
                  <Input
                    disabled={
                      selectedChat != null && selectedChat.closed ? true : false
                    }
                    value={message}
                    onChange={handleMessageChange}
                    className="input-message border-none focus:shadow-none"
                    placeholder="Type your messages here"
                  ></Input>

                  <ConfigProvider wave={{ disabled: true }}>
                    <button
                      disabled={
                        selectedChat != null && selectedChat.closed
                          ? true
                          : false
                      }
                      type="submit"
                      className="send-btn"
                    >
                      <img
                        className="send-btn-image"
                        src="/images/payment/sendBtn.png"
                      />
                    </button>
                  </ConfigProvider>
                </Box>
              </div>
            </Col>
          )}
        </Row>
      </section>
    </>
  );
}
