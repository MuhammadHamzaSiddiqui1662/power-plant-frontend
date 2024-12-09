import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { ChatData } from "../../../../types/chat";
import { Button, Card, Col, ConfigProvider, Row, Typography } from "antd";
import { Avatar, Box, Stack } from "@mui/material";
import { User, UserType } from "../../../../types/user";
import Link from "next/link";
import { MessageData } from "../../../../types/message";
import { useSelector } from "react-redux";
import { MessageType } from "../../../../types/MessageType";
import { TextBox } from "../TextBox/TextBox";
import { ReviewModal } from "../ReviewModal/ReviewModal";
import { Review } from "../../../../types/ReviewType";
const { Title, Text } = Typography;

const formatTime = (utcTime: number | Date) => {
  const date = new Date(utcTime);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface Props {
  chatDetails?: ChatData;
  messages: MessageData[];
  extractReceiver: (chat: ChatData) => User;
  handleSendMessage: (content: string, type: MessageType) => void;
  handleRequestCloseDeal: () => void;
  handleCancelCloseDeal: (messageId: string) => void;
  handleRejectCloseDeal: (chatId: string) => void;
  handleReviewSubmit: (review: Review) => void;
}

export const MessageContainer: FC<Props> = ({
  chatDetails,
  messages,
  extractReceiver,
  handleSendMessage,
  handleRequestCloseDeal,
  handleCancelCloseDeal,
  handleRejectCloseDeal,
  handleReviewSubmit,
}) => {
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const messageWindowRef = useRef(null);
  const receiver = chatDetails ? extractReceiver(chatDetails) : null;

  const handleOpenReviewModal = () => {
    setReviewModalVisible(true);
  };

  useLayoutEffect(() => {
    if (messageWindowRef.current)
      messageWindowRef.current.scrollTop =
        messageWindowRef.current.scrollHeight;
  }, [messageWindowRef.current, messages]);

  return !chatDetails ? (
    <Col
      xs={22}
      md={22}
      lg={16}
      xl={16}
      xxl={12}
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
      xxl={12}
      className="h-full border custom-border rounded-2xl flex flex-col"
    >
      <ReviewModal
        visible={reviewModalVisible}
        setVisible={setReviewModalVisible}
        handleReviewSubmit={handleReviewSubmit}
      />
      <div className="pd-24">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              className="h-4x w-4x"
              src={receiver.imageUrl}
              alt={receiver.name}
            />
            <Stack direction="column" spacing={0}>
              <Link
                className="anchor-design"
                href={`/profile/${receiver._id}?userType=${receiver.type}`}
              >
                <Typography.Text className="f-16 b-7xx">
                  {receiver.name}
                </Typography.Text>
              </Link>
              <Link
                className="anchor-design"
                href={`/details/${chatDetails.ip._id}`}
              >
                {/* @ts-ignore */}
                <Typography.Text className="f-16 b-6xx" ellipsis={{ rows: 1 }}>
                  {chatDetails.ip.name}
                </Typography.Text>
              </Link>
            </Stack>
          </Stack>

          <Button
            disabled={chatDetails != null && chatDetails.closed ? true : false}
            className="close-deal-btn"
            onClick={handleRequestCloseDeal}
          >
            <img src="images/payment/closeDeal.png" />
            <text className="f-16 b-6xx">Close Deal</text>
          </Button>

          {/* <Button
            className="i-btn"
            type="success"
            shape="circle"
            size="small"
          >
            <text className="c-white">i</text>
          </Button> */}
        </Stack>
      </div>
      <div className="divider"></div>
      {messages.length === 0 ? (
        <div className="message-container"></div>
      ) : (
        <div className="message-container" ref={messageWindowRef}>
          {messages.map((message) => (
            <div key={message._id}>
              {message.sender._id === user._id ? (
                <div className="pd-24">
                  {message.type === MessageType.Notification ? (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      maxWidth={"80%"}
                      width={"fit-content"}
                      mx={"auto"}
                      p={1}
                      border={"1px solid #ffdf00"}
                      borderRadius={2}
                      bgcolor={"#ffd1003b"}
                    >
                      <Text
                        className="f-12"
                        style={{
                          color: "#ffdf00",
                          textAlign: "center",
                        }}
                      >
                        {message.content}
                      </Text>
                    </Box>
                  ) : message.type === MessageType.CloseChat ? (
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
                                    handleCancelCloseDeal(message._id)
                                  }
                                  disabled={chatDetails.closed ? true : false}
                                >
                                  <text className="f-18 b-5xx">Cancel</text>
                                </Button>
                              </ConfigProvider>
                            </div>
                          ) : (
                            <div className="text-center">
                              <ConfigProvider wave={{ disabled: true }}>
                                <Button
                                  className="deal-close-btn br-right"
                                  disabled={
                                    chatDetails.reviewed || chatDetails.closed
                                  }
                                  onClick={() =>
                                    handleRejectCloseDeal(chatDetails._id)
                                  }
                                >
                                  <text className="f-18 b-5xx">Reject</text>
                                </Button>
                              </ConfigProvider>

                              <ConfigProvider wave={{ disabled: true }}>
                                <Button
                                  className="deal-close-btn"
                                  disabled={
                                    chatDetails.reviewed || chatDetails.closed
                                  }
                                  onClick={handleOpenReviewModal}
                                >
                                  <text className="f-18 b-5xx">Accept</text>
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
                          alt={message.sender.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      </Col>
                    </Row>
                  ) : message.type === MessageType.ReviewChat ? (
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
                            <ConfigProvider wave={{ disabled: true }}>
                              <Button
                                className="deal-close-cancel-btn"
                                disabled={
                                  message.sender._id === user._id ||
                                  chatDetails.reviewed
                                    ? true
                                    : false
                                }
                                onClick={handleOpenReviewModal}
                              >
                                <text className="f-18 b-5xx">Review</text>
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
                          src={message.sender.imageUrl}
                          alt={message.sender.name}
                          sx={{ width: 32, height: 32 }}
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
                          alt={message.sender.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              ) : (
                <div className="pd-24">
                  {message.type === MessageType.Notification ? (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      maxWidth={"80%"}
                      width={"fit-content"}
                      mx={"auto"}
                      p={1}
                      border={"1px solid #ffdf00"}
                      borderRadius={2}
                      bgcolor={"#ffd1003b"}
                    >
                      <Text
                        className="f-12"
                        style={{
                          color: "#ffdf00",
                          textAlign: "center",
                        }}
                      >
                        {message.content}
                      </Text>
                    </Box>
                  ) : message.type === MessageType.CloseChat ? (
                    <Row justify={"start"}>
                      <Col xs={{ span: 1 }} className="m-0-20">
                        <Avatar
                          src={message.sender.imageUrl}
                          alt={message.sender.name}
                          sx={{ width: 32, height: 32 }}
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
                                    handleCancelCloseDeal(message._id)
                                  }
                                  disabled={chatDetails.closed ? true : false}
                                >
                                  <text className="f-18 b-5xx">Cancel</text>
                                </Button>
                              </ConfigProvider>
                            </div>
                          ) : (
                            <div className="text-center">
                              <>
                                <ConfigProvider wave={{ disabled: true }}>
                                  <Button
                                    className="deal-close-btn br-right"
                                    disabled={
                                      chatDetails.reviewed || chatDetails.closed
                                    }
                                    onClick={() =>
                                      handleRejectCloseDeal(chatDetails._id)
                                    }
                                  >
                                    <text className="f-18 b-5xx">Reject</text>
                                  </Button>
                                </ConfigProvider>

                                <ConfigProvider wave={{ disabled: true }}>
                                  <Button
                                    className="deal-close-btn"
                                    disabled={
                                      chatDetails.reviewed || chatDetails.closed
                                    }
                                    onClick={handleOpenReviewModal}
                                  >
                                    <text className="f-18 b-5xx">Accept</text>
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
                                src={message.sender.imageUrl}
                                alt={message.sender.name}
                                sx={{ width: 32, height: 32 }}
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
                                  <ConfigProvider wave={{ disabled: true }}>
                                    <Button
                                      className="deal-close-cancel-btn"
                                      disabled={
                                        message.sender._id === user._id ||
                                        chatDetails.reviewed
                                          ? true
                                          : false
                                      }
                                      onClick={handleOpenReviewModal}
                                    >
                                      <text className="f-18 b-5xx">Review</text>
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
                                src={message.sender.imageUrl}
                                alt={message.sender.name}
                                sx={{ width: 32, height: 32 }}
                              />
                            </Col>

                            <Col xs={{ span: 9 }}>
                              <Card className={"pd-18 message receiver"}>
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
        <TextBox
          handleSendMessage={handleSendMessage}
          disabled={chatDetails != null && chatDetails.closed ? true : false}
        />
      </div>
    </Col>
  );
};
