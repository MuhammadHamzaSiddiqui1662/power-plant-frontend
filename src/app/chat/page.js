"use client";
import { Row } from "antd";
import Navbar from "../componants/Navbar";
import { ChatList } from "../componants/chat/ChatList/ChatList";
import { useChats } from "../../hooks/useChat";
import { MessageContainer } from "../componants/chat/MessageContainer/MessageContainer";
import "./style.css";

export default function Chat() {
  const {
    chatDetails,
    chatList,
    messages,
    handleSendMessage,
    handleRequestCloseDeal,
    handleCancelCloseDeal,
    handleRejectCloseDeal,
    handleReviewSubmit,
    extractReceiver,
  } = useChats();

  return (
    <>
      <Navbar />
      <section className="section">
        <Row justify={"center"} className="h-full" style={{ gap: 32 }}>
          <ChatList chatList={chatList} extractReceiver={extractReceiver} />
          <MessageContainer
            chatDetails={chatDetails}
            messages={messages}
            extractReceiver={extractReceiver}
            handleSendMessage={handleSendMessage}
            handleRequestCloseDeal={handleRequestCloseDeal}
            handleCancelCloseDeal={handleCancelCloseDeal}
            handleRejectCloseDeal={handleRejectCloseDeal}
            handleReviewSubmit={handleReviewSubmit}
          />
        </Row>
      </section>
    </>
  );
}
