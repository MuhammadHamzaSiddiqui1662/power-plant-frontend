"use client";
import { useState } from "react";
import { Row, Col, Checkbox, Card, Rate, Input, Modal, Typography, Button } from 'antd';
const { Title, Paragraph, Text, } = Typography;
import "./ModalCSS.css";

export default function ReviewModal({visible,setVisible}) {
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState({
    displayName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    accountNumber: "",
    paypal: "",
  });
  const [error, setError] = useState("");
  const handleCancel = async (e) => {
    setVisible(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await signUp(data);
      console.log("Session:", session);
    } catch (error) {
      console.log("error: ", error);
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
            <Card className="review-card">

              <h1 className="f-24 b-7xx">You are going to dehire now, kindly rate accordingly: </h1>

              <Checkbox className="checkbox-deal" ><text className="f-18 b-5xx">Successfull deal</text></Checkbox>

              <Input.TextArea placeholder="Enter description here" className="input-area"></Input.TextArea>

              <Row className="pd-18">
                <Col xs={{ span: 8 }}><text className="f-18 b-5xx">Price negotiation</text></Col>
                <Col xs={{ span: 6, offset: 10 }} className="pd-10"><Rate></Rate></Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Responsiveness</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10"><Rate></Rate></Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Communication</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10"><Rate></Rate></Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Technical Skills</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10"><Rate></Rate></Col>
              </Row>

              <Col span={4} offset={10}>
                <Button className="c-green pd-18-24" type="primary">Dehire</Button>
              </Col>

            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}


