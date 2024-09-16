"use client";
import { useState, useRef } from "react";
import {
  Row,
  Col,
  Space,
  Card,
  Divider,
  Image,
  Typography,
  Button,
} from "antd";
const { Title, Paragraph, Text } = Typography;
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import "./style.css";
import { useGetStripePaymentIntentQuery } from "../../services/payment/payment";
import CheckoutForm from "../componants/payment/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import { useSelector } from "react-redux";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const router = useRouter();
  const type = useSearchParams().get("type") || "subscribe";
  const payButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  if (!accessToken) router.push("/auth-signin");
  const { data: stripeResponse } = useGetStripePaymentIntentQuery(type);

  return !stripeResponse ? (
    <></>
  ) : (
    <>
      <Navbar />
      <section className="my-28">
        <h5 className="my-6 text-4xl text-center">Payment Information</h5>

        <Row justify={"center"}>
          <Col xs={22} md={20} lg={10} xl={8} xxl={8} className="mb-2">
            <Card className="subscriber-fee-card">
              <Typography>
                <Title>{stripeResponse.packageDetails.title}</Title>
                <Paragraph className="c-grey">
                  Power Plant aims to make the IP transactions market more
                  transparent. It allows IP owners to profile their licensing,
                  sales operations and technology transfer programmes, as well
                  as provide details of specific rights that they are interested
                  in transacting. It then allows IP buyers to search the
                  resulting library of IP assets based on industry, technology
                  and transaction type. Enquire below to find out more. It then
                  allows IP buyers to search the resulting library of IP assets
                  based on industry, technology and transaction type. Enquire
                  below to find out more.
                </Paragraph>
              </Typography>

              <Divider />

              <Typography>
                <Title level={5} className="f-18 b-5xx">
                  Payment Method
                </Title>
              </Typography>

              <Row>
                <Space direction="horizontal" size="middle" className="flex">
                  <Col>
                    <Card className="visa-card">
                      <Image
                        preview={false}
                        width={50}
                        src="images/payment/visa.png"
                      />
                    </Card>
                  </Col>

                  <Col>
                    <Card className="paypal-card">
                      <Image
                        preview={false}
                        width={60}
                        src="images/payment/paypal.png"
                      />
                    </Card>
                  </Col>

                  <Col>
                    <Card className="stripe-card">
                      <Image
                        preview={false}
                        width={50}
                        src="images/payment/stripe.png"
                      />
                    </Card>
                  </Col>
                </Space>
              </Row>

              <br />
              {stripeResponse && stripeResponse.clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret: stripeResponse.clientSecret }}
                >
                  <CheckoutForm
                    clientSecret={stripeResponse.clientSecret}
                    payButton={payButtonRef}
                    type={type}
                    setIsLoading={setIsLoading}
                  />
                </Elements>
              )}
            </Card>
          </Col>

          <Col xs={0} md={0} lg={2} xl={1} xxl={1}></Col>

          <Col xs={22} md={20} lg={10} xl={7} xxl={6} className="mt-40">
            <Card className="payment-card" bordered={false}>
              <Typography>
                <Title className="f-24 b-5xx">Order Summary</Title>
                <Row>
                  <Col span={8} offset={1}>
                    <Text className="f-16 b-5xx">
                      {stripeResponse.packageDetails.title}
                    </Text>
                  </Col>
                  <Col span={6} offset={9}>
                    <Text className="f-16 b-5xx">
                      ${stripeResponse.packageDetails.amount}
                    </Text>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={6} offset={1}>
                    <Title className="f-18 b-5xx"> Total</Title>
                  </Col>
                  <Col span={6} offset={11}>
                    <Title className="f-18 b-5xx">
                      ${stripeResponse.packageDetails.amount}
                    </Title>
                  </Col>
                </Row>
                <Row>
                  <Col span={6} offset={1}>
                    <Text className="f-14 b-5xx"> (Incl. VAT) </Text>
                  </Col>
                </Row>
              </Typography>
              <Col span={4} offset={13}>
                <ButtonContained
                  ref={payButtonRef}
                  className="text-base"
                  type="primary"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Pay Now
                </ButtonContained>
              </Col>
            </Card>
          </Col>
        </Row>
      </section>
      <Footer />
    </>
  );
}
