"use client";
import { Row, Col, Input } from "antd";
import "./style.css";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import ToastMessage from "../Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateUserMutation } from "../../../services/user/user";
import { useUpdateIpMutation } from "../../../services/ip/ip";
import { IpStatus } from "../../../types/ip";
import { useSelector } from "react-redux";

export default function CheckoutForm({
  clientSecret,
  payButton,
  type,
  setIsLoading,
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const id = useSearchParams().get("id");
  const { user } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation();
  const [updateIp] = useUpdateIpMutation();

  const stripePaymentHandler = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      setIsLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error) {
        console.log(error);
        setIsLoading(false);
        ToastMessage({ message: error.message, type: "error" });
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        console.log(confirmError);
        setIsLoading(false);
        ToastMessage({ message: confirmError.message, type: "error" });
      } else {
        console.log(`Payment Successfull ${paymentIntent}`);

        if (type === "subscribe") {
          const formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({
              _id: user._id,
              subscriber: true,
            })
          );
          await updateUser(formData);
          ToastMessage({ message: "You have Subscribed!", type: "success" });
          router.push(`/list`);
        }
        if (type === "patent") {
          const formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({
              _id: id,
              status: IpStatus.AppliedForPatent,
            })
          );
          await updateIp(formData);
          ToastMessage({ message: "Applied for Patent!", type: "success" });
          router.push(`/profile`);
        }
        if (type === "publish") {
          const formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({
              _id: id,
              status: IpStatus.Pending,
            })
          );
          await updateIp(formData);
          ToastMessage({
            message: "IP submited for Approval!",
            type: "success",
          });
          router.push(`/profile`);
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (payButton.current) payButton.current.onclick = stripePaymentHandler;
  }, [payButton, stripePaymentHandler]);

  return (
    <>
      <form onSubmit={stripePaymentHandler}>
        <Row>
          <Col span={24}>
            <label className="f-16 b-5xx">Card Number: </label>
            <CardNumberElement className="ant-input css-dev-only-do-not-override-1uq9j6g ant-input-outlined py-2" />
            <Input style={{ display: "none" }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={11}>
            <label className="f-16 b-5xx">Expiry Date: </label>
            <CardExpiryElement className="ant-input css-dev-only-do-not-override-1uq9j6g ant-input-outlined py-2" />
          </Col>
          <Col span={11} offset={1}>
            <label className="f-16 b-5xx">CVV: </label>
            <CardCvcElement className="ant-input css-dev-only-do-not-override-1uq9j6g ant-input-outlined py-2" />
          </Col>
        </Row>
      </form>
    </>
  );
}
