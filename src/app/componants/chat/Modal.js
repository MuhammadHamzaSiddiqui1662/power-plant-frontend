"use client";
import { useState } from "react";
import { Row, Col, Card, Input, Modal, Button } from "antd";
import "./ModalCSS.css";
import { useCreateChatMutation } from "../../../services/chat/chat";

export default function ChatModal({ visible, setVisible }) {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();

  const handleCancel = async (e) => {
    setVisible(false);
  };

  const InputIDHandler = (e) => {
    setParticipants((prev) => {
      const temp = [...prev];
      temp[0] = e.target.value;
      return temp;
    });
  };

  const InputBrokerIDHandler = (e) => {
    setParticipants((prev) => {
      const temp = [...prev];
      temp[1] = e.target.value;
      return temp;
    });
  };

  const HandleCreateChat = async () => {
    try {
      const { data: createChatgResponse, error } = await createChat({
        participants,
      });
      if (error) return setError(error.message);
      console.log(createChatgResponse);
     
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        style={{ minWidth: "700px", maxWidth: "700px" }} // Example for setting width
        bodyStyle={{ maxHeight: "600px" }}
        footer={null} //
      >
        <Row justify={"center"}>
          <Col span={24}>
            <Card className="chat-dialogue">
              <h1 className="f-24 b-7xx">Create Chat </h1>
              <br />
              <br />
              <Row>
                <Col md={22}>
                <Input 
                value={participants[0]}
                onChange={InputIDHandler}
                placeholder="Enter your Id"
              ></Input>
                </Col>
              </Row>
             
              <br />
              <br />
              <Row>
                <Col md={22}>
                <Input
                value={participants[1]}
                onChange={InputBrokerIDHandler}
                placeholder="Enter broker Id"
              ></Input>
                </Col>
              </Row>
              <br />
              <br />
              <Col span={4} offset={10}>
                <Button
                  className="c-green pd-18-24"
                  onClick={HandleCreateChat}
                  type="primary"
                  isLoading={isCreating}
                  disabled={isCreating}
                >
                  Create
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
