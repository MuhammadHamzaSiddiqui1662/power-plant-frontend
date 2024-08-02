"use client";
import { useState } from "react";
import { Row, Col, Space, Card, Divider, Input, Image, Typography, Badge, Button } from 'antd';
const { Title, Paragraph, Text, } = Typography;
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import "./style.css";
import { payNow } from "../../services/payment";

export default function Payment() {
  const [selectedCardType, setSelectedCardType] = useState(1);
  const [paymentData, setPaymentData] = useState({
    displayName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    accountNumber: "",
    paypal: "",
  });
  const [error, setError] = useState("");

  const visaClick = (type) => {
    setSelectedCardType(type)
  };

  const paypalClick = (type) => {
    setSelectedCardType(type)
  };

  const stripeClick = (type) => {
    setSelectedCardType(type)
  };


  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const paymentResponse = await payNow(paymentData);
      console.log("Session:", paymentResponse);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="my-28">
        <h5 className="my-6 text-4xl text-center">Payment Information</h5>

        <Row justify={"center"}>
         
          <Col xs={22} md={20} lg={10} xl={8} xxl={8}>
            <Card className="subscriber-fee-card">

              <Typography>
                <Title>Subscriber Fee</Title>
                <Paragraph className="c-grey">Power Plant aims to make the IP transactions market more transparent. It allows IP owners to profile their licensing, sales operations and technology transfer programmes, as well as provide details of specific rights that they are interested in transacting. It then allows IP buyers to search the resulting library of IP assets based on industry, technology and transaction type. Enquire below to find out more. It then allows IP buyers to search the resulting library of IP assets based on industry, technology and transaction type. Enquire below to find out more.</Paragraph>
              </Typography>

              <Divider />

              <Typography>
                <Title level={5} className="f-18 b-5xx">Payment Method</Title>
              </Typography>

              <Row>
                <Space direction="horizontal" size="middle" className="flex">
                  <Col>
                    {selectedCardType === 1 ?
                      <Badge color="green" offset={[-5, 2]} count={"✓"} >
                        <Card key={1} className='visa-card active' onClick={() => visaClick(1)}>
                          <Image preview={false} width={50} src="images/payment/visa.png" />
                        </Card>
                      </Badge> :
                      <Card key={1} className='visa-card' onClick={() => visaClick(1)}>
                        <Image preview={false} width={50} src="images/payment/visa.png" />
                      </Card>
                    }
                  </Col>

                  <Col>
                    {selectedCardType === 2 ?
                      <Badge color="green" offset={[-5, 2]} count={"✓"} >
                        <Card key={2} className='paypal-card active' onClick={() => paypalClick(2)}>
                          <Image preview={false} width={60} src="images/payment/paypal.png" />
                        </Card>
                      </Badge> :
                      <Card key={2} className='paypal-card' onClick={() => paypalClick(2)}>
                        <Image preview={false} width={60} src="images/payment/paypal.png" />
                      </Card>
                    }
                  </Col>

                  <Col>
                    {selectedCardType === 3 ?
                      <Badge color="green" offset={[-5, 2]} count={"✓"} >
                        <Card key={3} className='stripe-card active' onClick={() => stripeClick(3)}>
                          <Image preview={false} width={50} src="images/payment/stripe.png" />
                        </Card>
                      </Badge> :
                      <Card key={3} className='stripe-card' onClick={() => stripeClick(3)}>
                        <Image preview={false} width={50} src="images/payment/stripe.png" />
                      </Card>
                    }
                  </Col>
                </Space>
              </Row>

              <br />
              <Row>
                <Col span={24}>
                  <label className="f-16 b-5xx">Card Number: </label>
                  <Input placeholder="Type your card number here" />
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col span={11}>
                  <label className="f-16 b-5xx">Expiry Date: </label><Input placeholder="MM/YY" />
                </Col>
                <Col span={11} offset={1}>
                  <label className="f-16 b-5xx">CVV: </label><Input placeholder="Type 3-digits here" />
                </Col>
              </Row>

            </Card>
          </Col >

          <Col xs={0} md={0} lg={2} xl={1} xxl={1}></Col>
         
          <Col xs={22} md={20} lg={10} xl={7} xxl={6} className="mt-40">
            <Card className="payment-card" bordered={false}>
              <Typography>
                <Title className="f-24 b-5xx">Order Summary</Title>
                <Row>
                  <Col span={8} offset={1}><Text className="f-16 b-5xx"> Subscriber Fee</Text>
                  </Col>
                  <Col span={6} offset={9}><Text className="f-16 b-5xx"> $200</Text></Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={6} offset={1}><Title className="f-18 b-5xx"> Total</Title>
                  </Col>
                  <Col span={6} offset={11}><Title className="f-18 b-5xx"> $200</Title></Col>
                </Row>
                <Row>
                  <Col span={6} offset={1}><Text className="f-14 b-5xx"> (Incl. VAT) </Text>
                  </Col>
                </Row>
              </Typography>
              <Col span={4} offset={13}>
                <Button className="pay-now-btn" onClick={handlePayment} type="primary"><text className="f-16">Pay Now</text></Button>
              </Col>
            </Card>
        
          </Col>
        
        </Row >
      </section >
      <Footer />
    </>
  );
}
