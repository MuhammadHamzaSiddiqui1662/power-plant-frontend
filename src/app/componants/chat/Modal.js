"use client";
import { useState } from "react";
import { Row, Col, Card, Input, Modal, Typography, Button } from 'antd';
const { Title, Paragraph, Text, } = Typography;
import "./ModalCSS.css";
import {
  useCreateChatMutation,
} from "../../../services/chat/chat";

export default function ChatModal({ visible, setVisible }) {
  const [id, setId] = useState('');
  const [brokerId, setBrokerId] = useState('');
  const [error, setError] = useState("");
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();

  const handleCancel = async (e) => {
    setVisible(false)
  };

  const InputIDHandler = (e) => {
    setId(e.target.value);
  };

  const InputBrokerIDHandler = (e) => {
    setBrokerId(e.target.value);
  };

  const HandleCreateChat = async () => {
    try {
      const { data: createChatgResponse, error } = await createChat({
        id,
        brokerId,
      });
      if (error) return setError(error.message);
      console.log(createChatgResponse);
      if(createChatgResponse.chatId){
        if (chatId) {
          socket.emit('joinChat', { chatId });
      }
      }
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };


  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        style={{ minWidth: '700px', maxWidth: '700px', }} // Example for setting width
        bodyStyle={{ maxHeight: '600px', }}
        footer={null}//
      >
        <Row justify={"center"}>
          <Col span={24}>
            <Card className="chat-dialogue">

              <h1 className="f-24 b-7xx">Create Chat </h1>
              <br />
              <br />
              <Input value={id} onChange={InputIDHandler} placeholder="Enter your Id"></Input>
              <br />
              <br />
              <Input value={brokerId} onChange={InputBrokerIDHandler} placeholder="Enter broker Id"></Input>
              <br />
              <br />
              <Col span={4} offset={10}>
                <Button
                  className="c-green pd-18-24"
                  onClick={HandleCreateChat}
                  type="primary"
                  isLoading={isCreating}
                  disabled={isCreating}>Create</Button>
              </Col>

            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}


