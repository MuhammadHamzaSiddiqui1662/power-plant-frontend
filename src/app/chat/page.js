"use client";
import { useState, useEffect } from "react";
import { Row, Col, Space, Card, Button, Input, ConfigProvider, Typography, Badge, Avatar, message } from 'antd';
const { Title, Paragraph, Text, } = Typography;
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import ReviewModal from "../componants/review/Modal"
import ChatModal from "../componants/chat/Modal"
import io from 'socket.io-client';

import "./style.css";

import {
  useChatsMutation,
  useChatMutation,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} from "../../services/chat/chat";

import {
  useMessageMutation,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation
} from "../../services/message/message";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('')
  const [chatClickedIndex, setChatClickedIndex] = useState(0);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [getAllChat, { isLoading: isGetting }] = useChatMutation();
  const [getChatById, { isLoading: isGettingById }] = useChatMutation();
  const [updateChat, { isLoading: isUpdating }] = useUpdateChatMutation();
  const [deleteChat, { isLoading: isDeleting }] = useDeleteChatMutation();


  const handleOpenReviewModal = () => {
    setReviewModalVisible(true);
  };

  const handleOpenChatModal = () => {
    setChatModalVisible(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const closeDeal = () => {
    let message =
    {
      image: "images/payment/Avatar.png",
      text: "sdfdsfsdfgdegregregregregreg",
      sender: "me",
      deal_close: true,
      is_accepted: false
    }
    setMessages([...messages, message]);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const chatClick = (index) => {
    setChatClickedIndex(index)
    getChatByIdHandler();
  };

  const sendMessage = () => {
    try {
      let msg =
      {
        image: "images/payment/Avatar.png",
        text: message,
        sender: "me",
      }
      console.log(message);

      socket.emit('sendMessage', { chatId: 'yourChatId', senderId: 'yourSenderId', content: inputMessage });
      setMessages([...messages, msg]);
      setMessage('');

    } catch (error) {
      console.log(`error --> ${error}`);

    }
  };
  

  const getAllChatsHandler = async (Id) => {
    try {
      const { data: getAllChatsResponse, error } = await getAllChat();
      if (error) return setError(error.message);
      console.log(getAllChatsResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const getChatByIdHandler = async (Id) => {
    try {
      const { data: getChatByIdResponse, error } = await getChatById({
        Id,
      });
      if (error) return setError(error.message);
      console.log(getChatByIdResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };
  
  const updateChatHandler = async (Id) => {
    try {
      const { data: updateChatResponse, error } = await updateChat({
        Id,
      });
      if (error) return setError(error.message);
      console.log(updateChatResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const deleteChatHandler = async (Id) => {
    try {
      const { data: deleteChatResponse, error } = await deleteChat({
        Id,
      });
      if (error) return setError(error.message);
      console.log(deleteChatResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };


  useEffect(() => {

    const socket = io('http://localhost:3001');

    getAllChatsHandler();

    socket.on('newMessage', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('messageSeen', ({ messageId, userId, seenAt }) => {
      console.log(`Message ${messageId} seen by user ${userId} at ${seenAt}`);
    });

    // Dummy Data
    setMessages([
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "me" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "me", deal_close: true, is_accepted: true },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you", deal_close: true, is_accepted: false },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" },
      { image: "images/payment/Avatar.png", text: "sdfdsfsdfgdegregregregregreg", sender: "you" }

    ])

    //Dummy Data
    setChats([
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 9 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 3 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 0 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 1 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
      { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    ])

    return () => {
      socket.disconnect();
    };


  }, []);

  return (
    <>
      <ReviewModal visible={reviewModalVisible} setVisible={setReviewModalVisible} />

      <ChatModal visible={chatModalVisible} setVisible={setChatModalVisible} />

      <Navbar />
      <section className="my-28">
        <Row justify={"start"}>
          <Col xs={{ span: 5, offset: 1 }} >
            <Card className="h-6xx">
              <div className="pd-24">

                <h1 className="f-32 b-6xx">Messages</h1>
                <Button onClick={handleOpenChatModal}>Create Chat</Button>
{/* 
               
                <Button onClick={updateChatHandler}>Update Chat</Button>
                <Button onClick={deleteChatHandler}>Delete Chat</Button> */}

                <text className="fl-r f-14 b-5xx">CHAT +</text>

                <div className="chat-container">
                  {chats.map((chat, index) => (
                    
                    <Card key={index} className={`m-40 chat-card ${ chatClickedIndex  === index ? "active":""}`} onClick={() => chatClick(index)}>
                      <Row className="pd-12">
                        <Col xs={{span:5}}>
                          {chat.is_online === true ?
                            <Badge status="success" dot offset={[0, 40]} className="pd-5">
                              <Avatar src={chat.image} shape="circle" className="h-5x w-5x"></Avatar>
                            </Badge> :
                            <Avatar src={chat.image} shape="circle" className="h-5x w-5x"> </Avatar>
                          }
                        </Col>

                        <Col xs={{span:8, offset:1}}>
                          <text className="f-16 b-7xx">{chat.name}</text>
                          <br />
                          <text className="c-grey">{chat.last_message}</text>
                        </Col>

                        <Col>
                          {chat.last_message_count > 0 ?
                            <Badge color="green" count={chat.last_message_count} offset={[80, 20]} ></Badge> :
                            <text></text>}
                        </Col>

                      </Row>
                    </Card>
                  ))}
                </div>

              </div>
            </Card>
          </Col>

          <Col xs={{ span: 16, offset: 1 }}>
            <Card className="h-65x">

              <div className="pd-24">
                <Row>
                  <Col xs={{ span: 1 }}>
                    <Avatar className="h-4x w-4x" src="images/payment/Avatar.png" shape="circle" />
                  </Col>

                  <Col xs={{ span: 3 }} sm={{ span: 24 }}  md={{ span: 6 }} className="pd-0-15">
                    <text className="f-16 b-6xx" >Faraz Ayub</text>
                    <br />
                    <text>C#1249UoH</text>
                  </Col>

                  <Col xs={{ span: 3, offset: 15 }} sm={{ span: 3, offset: 12 }} md={{ span: 3, offset: 12 }} xl={{ span: 3, offset: 14 }} xxl={{ span: 1, offset: 16 }} >
                    <Button className="close-deal-btn" onClick={closeDeal}>
                      <img src="images/payment/closeDeal.png" />
                      <text className="f-16 b-6xx"> Close Deal</text>
                    </Button>
                  </Col>

                  <Col xs={{ span: 1 }} sm={{ span: 1 }}  md={{ span: 1, offset:1 }} xl={{ span: 1 , pull:1 }} xxl={{ span: 1, pull:1  }}>
                    <Button className="i-btn" type="success" shape="circle" size="small" >
                      <text className="c-white">i</text>
                    </Button>
                  </Col>
                </Row>
              </div>

              <div className="divider">
              </div>

              <div className="message-container">
                {messages.map((message, index) => (
                  <div key={index} >
                    {
                      message.sender === 'me' ?
                        <div className="pd-24">
                          {message.deal_close === true ?
                            <Row justify={'end'}>
                              <Col xs={{ span: 9, push: 1 }}>
                                <Card className={'message'}>
                                  <div className="deal-close">
                                    <Typography>
                                      <Text className="c-white">{`${message.sender} has sent you Deal Close offer:`}</Text>
                                      <br />
                                      <Text className="c-white f-42 b-7xx">DEAL CLOSE</Text>
                                    </Typography>
                                  </div>

                                  {message.is_accepted === true ?
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-cancel-btn">
                                          <text className="f-18 b-5xx">Cancel</text>
                                        </Button>
                                      </ConfigProvider>
                                    </div> :
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-btn br-right">
                                          <text className="f-18 b-5xx">Reject</text>
                                        </Button>
                                      </ConfigProvider>

                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-btn" onClick={handleOpenReviewModal}>
                                          <text className="f-18 b-5xx">Accept</text>
                                        </Button>
                                      </ConfigProvider>
                                    </div>
                                  }
                                </Card>
                                <text className="fl-r m-0-80">8:00 PM</text>
                              </Col>

                              <Col xs={{ span: 1, }}>
                                <Avatar src={message.image} shape="circle" />
                              </Col>

                            </Row> :
                            <Row justify={'end'}>
                              <Col xs={{ span: 9, push: 1 }}>
                                <Card className={'pd-18 message sender'}>
                                  <Typography>
                                    <Text className="c-white">{message.text}</Text>
                                  </Typography>
                                </Card>
                                <text className="fl-r m-0-80">8:00 PM</text>
                              </Col>

                              <Col xs={{ span: 1, }}>
                                <Avatar src={message.image} shape="circle" />
                              </Col>
                            </Row>
                          }
                        </div> :
                        <div className="pd-24">
                          {message.deal_close === true ?
                            <Row justify={'start'}>

                              <Col xs={{ span: 1, }} className="m-0-20">
                                <Avatar src={message.image} shape="circle" />
                              </Col>

                              <Col xs={{ span: 9 }}>
                                <Card className={'message'}>
                                  <div className="deal-close">
                                    <Typography>
                                      <Text className="c-white">{`${message.sender} has sent you Deal Close offer:`}</Text>
                                      <br />
                                      <Text className="f-42 b-7xx c-white">DEAL CLOSE</Text>
                                    </Typography>
                                  </div>

                                  {message.is_accepted === true ?
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-cancel-btn">
                                          <text className="f-18 b-5xx">Cancel</text>
                                        </Button>
                                      </ConfigProvider>
                                    </div> :
                                    <div className="text-center">
                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-btn br-right">
                                          <text className="f-18 b-5xx">Reject</text>
                                        </Button>
                                      </ConfigProvider>

                                      <ConfigProvider wave={{ disabled: true }}>
                                        <Button className="deal-close-btn" onClick={handleOpenReviewModal}>
                                          <text className="f-18 b-5xx">Accept</text>
                                        </Button>
                                      </ConfigProvider>
                                    </div>
                                  }
                                </Card>

                                <text>8:00 PM</text>

                              </Col>

                            </Row> :
                            <Row justify={'start'}>
                              <Col xs={{ span: 1, }} className="m-0-20">
                                <Avatar src={message.image} shape="circle" />
                              </Col>

                              <Col xs={{ span: 9 }}>
                                <Card className={'pd-18 message receiver'}>
                                  <Typography>
                                    <Text>{message.text}</Text>
                                  </Typography>
                                </Card>
                                <text>8:00 PM</text>
                              </Col>
                            </Row>
                          }
                        </div>
                    }
                  </div>
                ))}
              </div>

              <div className="pd-24 mt-1x">
                <Space.Compact className="message-box">
                  <Input value={message} onChange={handleMessageChange} className="input-message" placeholder="Type your messages here"></Input>

                  <ConfigProvider wave={{ disabled: true }}>
                    <Button className="pin-button">
                      <img className="file-pin-image" src="images/payment/filePin.png" />
                    </Button>
                  </ConfigProvider>

                  <ConfigProvider wave={{ disabled: true }}>
                    <Button className="send-btn" onClick={sendMessage} >
                      <img className="send-btn-image" src="images/payment/sendbtn.png" />
                    </Button>
                  </ConfigProvider>
                </Space.Compact>
              </div>

            </Card>
          </Col>
        </Row>
      </section>
      <Footer />
    </>
  );
}
