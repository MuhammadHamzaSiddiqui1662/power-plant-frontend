"use client";
import { useState, useEffect } from "react";
import { Row, Col, Space, Card, Button, Input, ConfigProvider, Typography, Badge, Avatar, Drawer, FloatButton } from 'antd';
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
  useGetProfileMutation,
} from "../../services/user/user";

import {
  useChatsMutation,
  useChatMutation,
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
  const [chatsList, setChatsList] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('');
  const [brokerId, setBrokerId] = useState('');
  const [chatId, setChatId] = useState('')
  const [chatClickedIndex, setChatClickedIndex] = useState(0);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [getProfile, { isLoading: isGetting }] = useGetProfileMutation();
  const [chats, { isLoading: isGetting }] = useChatsMutation();
  const [getChatById, { isLoading: isGettingById }] = useChatMutation();
  const [updateChat, { isLoading: isUpdating }] = useUpdateChatMutation();
  const [deleteChat, { isLoading: isDeleting }] = useDeleteChatMutation();
  
  const socket = io('http://localhost:3001');

  const handleOpenReviewModal = () => {
    setReviewModalVisible(true);
  };

  const handleOpenChatModal = () => {
    setChatModalVisible(true);
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
    console.log("index==>" + index)
    setChatClickedIndex(index)
    getChatByIdHandler(index);
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
      if (chatId != '' && senderId != '') {
        socket.emit('sendMessage', { chatId: chatId, senderId: senderId, content: message });
        setMessages([...messages, msg]);
        setMessage('');
      }
    } catch (error) {
      console.log(`error --> ${error}`);

    }
  };

  const getAllChatsHandler = async () => {
    try {
      const { data: getUserProfileResponse, error } = await getProfile();
      if (error) return setError(error.message);
      setUser(getUserProfileResponse)
      console.log(getUserProfileResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const getAllChatsHandler = async () => {
    try {
      const { data: getAllChatsResponse, error } = await chats();
      if (error) return setError(error.message);
      setChatsList(getAllChatsResponse)
      console.log(getAllChatsResponse);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const getChatByIdHandler = async (Id) => {
    try {
      const { data: getChatByIdResponse, error } = await getChatById(Id);
      if (error) return setError(error.message);
      if (getChatByIdResponse._id) {
        setChatId(getChatByIdResponse._id);
        setSenderId(getChatByIdResponse.participants[0]._id);
        socket.emit("joinChat", { chatId });
      }
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

    getAllChatsHandler();

    getAllChatsHandler

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
      else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

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
    // setChats([
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 9 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 3 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 0 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: false, last_message_count: 1 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    //   { image: "images/payment/Avatar.png", name: "Faraz Ayub", last_message: "Done Deal", is_online: true, last_message_count: 1 },
    // ])

    return () => {
      socket.disconnect();
      window.removeEventListener('resize', handleResize)
    };


  }, []);

  if (isMobile) {
    return (
      <>
        <ReviewModal visible={reviewModalVisible} setVisible={setReviewModalVisible} brokerId={brokerId} reviewType={user.userType} />

        <ChatModal visible={chatModalVisible} setVisible={setChatModalVisible} />

        <Navbar />
        <section className="my-28">

          <Drawer
            title="Chats"
            placement="left"
            visible={visible}
            onClose={() => setVisible(false)}
          >
            <Col xs={23} sm={23} md={22} lg={7} xl={6} xll={6} >
              <h1 className="f-32 b-6xx">Messages</h1>
              <Button onClick={handleOpenChatModal}>Create Chat</Button>

              <text className="fl-r f-14 b-5xx">CHAT +</text>

              <div className="chat-container">
                {chatsList.map((chat, index) => (

                  <Card key={chat._id} className={`m-40 chat-card ${chatClickedIndex === chat._id ? "active" : ""}`} onClick={() => chatClick(chat._id)}>
                    <Row className="pd-12">
                      <Col xs={3} sm={3} md={3} lg={5} xl={2} xxl={1} >
                        {chat.participants[1].online === true ?
                          <Badge status="success" dot offset={[-5, 45]} className="pd-5">
                            <Avatar src={chat.participants[1].imageUrl} shape="circle" className="h-5x w-5x"></Avatar>
                          </Badge> :
                          <Avatar src={chat.participants[1].imageUrl} shape="circle" className="h-5x w-5x"> </Avatar>
                        }
                      </Col>

                      <Col xs={2} sm={2} md={3} lg={0} xl={3} xxl={2}></Col>

                      <Col xs={13} sm={10} md={8} lg={8} xl={8} xxl={16}>
                        <text className="f-16 b-7xx">{chat.participants[1].name}</text>
                        <br />
                        <text className="f-12 c-grey">{chat.last_message}</text>
                      </Col>

                      <Col xs={3} sm={3} md={3} lg={1} xl={3} xxl={3}>
                        {chat.last_message_count > 0 ?
                          <Badge color="green" count={chat.last_message_count} offset={[80, 20]} ></Badge> :
                          <text></text>}
                      </Col>

                    </Row>
                  </Card>
                ))}
              </div>
            </Col>
          </Drawer>

          <Row justify={"center"}>
            <Col xs={22} md={22} lg={15} xl={13} xll={12}>
              <Card className="h-65x">

                <div className="pd-24">
                  <Row>
                    <Col xs={{ span: 1 }}>
                      <Avatar className="h-4x w-4x" src="images/payment/Avatar.png" shape="circle" />
                    </Col>

                    <Col xs={3} sm={3} md={6} lg={5} className="pd-0-15">
                      <text className="f-16 b-7xx" >Faraz Ayub</text>
                      <br />
                      <text className="f-12">C#1249UoH</text>
                    </Col>

                    <Col xs={10} sm={10} lg={12} xl={11}></Col>

                    <Col xs={3} sm={3} md={3} lg={2} xl={3} xxl={3} >
                      <Button className="close-deal-btn" onClick={closeDeal}>
                        <img src="images/payment/closeDeal.png" />
                        <text className="f-16 b-6xx"> Close Deal</text>
                      </Button>
                    </Col>

                    <Col lg={1} xl={1}></Col>

                    <Col xs={3} sm={3} md={3} lg={2} xl={1} xxl={1}>
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
                                        <Text className="c-white f-9">{`${message.sender} has sent you Deal Close offer:`}</Text>
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
                                  <text className="fl-r f-9 m-0-80">8:00 PM</text>
                                </Col>

                                <Col xs={{ span: 1, }}>
                                  <Avatar src={message.image} shape="circle" />
                                </Col>

                              </Row> :
                              <Row justify={'end'}>
                                <Col xs={{ span: 9, push: 1 }}>
                                  <Card className={'pd-18 message sender'}>
                                    <Typography>
                                      <Text className="c-white f-12">{message.text}</Text>
                                    </Typography>
                                  </Card>
                                  <text className="fl-r f-9 m-0-80">8:00 PM</text>
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
                                        <Text className="c-white f-9">{`${message.sender} has sent you Deal Close offer:`}</Text>
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

                                  <text className="f-9">8:00 PM</text>

                                </Col>

                              </Row> :
                              <Row justify={'start'}>
                                <Col xs={{ span: 1, }} className="m-0-20">
                                  <Avatar src={message.image} shape="circle" />
                                </Col>

                                <Col xs={{ span: 9 }}>
                                  <Card className={'pd-18 message receiver'}>
                                    <Typography>
                                      <Text className="f-12">{message.text}</Text>
                                    </Typography>
                                  </Card>
                                  <text className='f-9'>8:00 PM</text>
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

          <FloatButton
            icon={'+'}
            type={'success'}
            className="chat-button"
            onClick={() => setVisible(true)}>
          </FloatButton>

        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ReviewModal visible={reviewModalVisible} setVisible={setReviewModalVisible} brokerId={brokerId} reviewType={user.userType} />

      <ChatModal visible={chatModalVisible} setVisible={setChatModalVisible} />

      <Navbar />
      <section className="my-28">
        <Row justify={"center"}>

          <Col xs={22} md={22} lg={7} xl={6} xll={6} >
            <Card className="h-6xx">
              <div className="pd-24">

                <h1 className="f-32 b-6xx">Messages</h1>
                <Button onClick={handleOpenChatModal}>Create Chat</Button>
                {/* 
               
                <Button onClick={updateChatHandler}>Update Chat</Button>
                <Button onClick={deleteChatHandler}>Delete Chat</Button> */}

                <text className="fl-r f-14 b-5xx">CHAT +</text>

                <div className="chat-container">
                  {chatsList.map((chat, index) => (

                    <Card key={chat._id} className={`m-40 chat-card ${chatClickedIndex === chat._id ? "active" : ""}`} onClick={() => chatClick(chat._id)}>
                      <Row className="pd-12">
                        <Col xs={3} sm={3} md={3} lg={5} xl={2} xxl={1} >
                          {chat.participants[1].online === true ?
                            <Badge status="success" dot offset={[-5, 45]} className="pd-5">
                              <Avatar src={chat.participants[1].imageUrl} shape="circle" className="h-5x w-5x"></Avatar>
                            </Badge> :
                            <Avatar src={chat.participants[1].imageUrl} shape="circle" className="h-5x w-5x"> </Avatar>
                          }
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={0} xl={3} xxl={2}></Col>

                        <Col xs={3} sm={3} md={3} lg={8} xl={8} xxl={16}>
                          <text className="f-16 b-7xx">{chat.participants[1].name}</text>
                          <br />
                          <text className="f-12 c-grey">{chat.participants[1].last_message}</text>
                        </Col>

                        <Col xs={3} sm={3} md={3} lg={1} xl={3} xxl={3}>
                          {chat.last_message_count > 0 ?
                            <Badge color="green" count={chat.participants[1].last_message_count} offset={[80, 20]} ></Badge> :
                            <text></text>}
                        </Col>

                      </Row>
                    </Card>
                  ))}
                </div>

              </div>
            </Card>
          </Col>

          <Col xs={22} md={22} lg={1} xl={1} xll={1}></Col>

          <Col xs={22} md={22} lg={15} xl={13} xll={12}>
            <Card className="h-65x">

              <div className="pd-24">
                <Row>
                  <Col xs={{ span: 1 }}>
                    <Avatar className="h-4x w-4x" src="images/payment/Avatar.png" shape="circle" />
                  </Col>

                  <Col xs={3} sm={3} md={6} lg={5} className="pd-0-15">
                    <text className="f-16 b-7xx" >Faraz Ayub</text>
                    <br />
                    <text className="f-12">C#1249UoH</text>
                  </Col>

                  <Col lg={12} xl={11}></Col>

                  <Col xs={3} sm={3} md={3} lg={2} xl={3} xxl={3} >
                    <Button className="close-deal-btn" onClick={closeDeal}>
                      <img src="images/payment/closeDeal.png" />
                      <text className="f-16 b-6xx"> Close Deal</text>
                    </Button>
                  </Col>

                  <Col lg={1} xl={1}></Col>

                  <Col xs={3} sm={3} md={3} lg={2} xl={1} xxl={1}>
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
                                      <Text className="c-white f-9">{`${message.sender} has sent you Deal Close offer:`}</Text>
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
                                <text className="fl-r f-9 m-0-80">8:00 PM</text>
                              </Col>

                              <Col xs={{ span: 1, }}>
                                <Avatar src={message.image} shape="circle" />
                              </Col>

                            </Row> :
                            <Row justify={'end'}>
                              <Col xs={{ span: 9, push: 1 }}>
                                <Card className={'pd-18 message sender'}>
                                  <Typography>
                                    <Text className="c-white f-12">{message.text}</Text>
                                  </Typography>
                                </Card>
                                <text className="fl-r f-9 m-0-80">8:00 PM</text>
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
                                      <Text className="c-white f-9">{`${message.sender} has sent you Deal Close offer:`}</Text>
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

                                <text className="f-9">8:00 PM</text>

                              </Col>

                            </Row> :
                            <Row justify={'start'}>
                              <Col xs={{ span: 1, }} className="m-0-20">
                                <Avatar src={message.image} shape="circle" />
                              </Col>

                              <Col xs={{ span: 9 }}>
                                <Card className={'pd-18 message receiver'}>
                                  <Typography>
                                    <Text className="f-12">{message.text}</Text>
                                  </Typography>
                                </Card>
                                <text className='f-9'>8:00 PM</text>
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
