"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { Row, Col, Input, Button } from 'antd';
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import { otpVerify, resendOTP } from "../../services/auth";
import "./style.css";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../services/auth/auth";

export default function OTPVerify() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const  email  = useSearchParams();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  console.log(email.get("email"))
  const [sendOTPData, setSendOTPData] = useState({
    email: email,
    otp: otp,
  });
  const [resendOTPData, setResendOTPData] = useState({
    email: email,
  });
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleMessageChange = (e) => {
    setOTP(e.target.value);
    console.log(otp)
  };

  const handleResend = async () => {
    try {
      const resendOTPResponse = await resendOTP(resendOTPData);
      if (resendOTPResponse.status === 200) {
        setSeconds(120);
        setIsActive(false);
      }
      else {
        setIsActive(false);
      }
    } catch (error) {
      console.log(`errror --> ${error}`)
    }
  };

  const handleSend = async () => {
    try {
      const otpVerifyResponse = await otpVerify(sendOTPData);
      if (otpVerifyResponse.status === 200) {
      }
      else {
      }
    } catch (error) {
      console.log(`error --> ${error}`)
    }
  };

  const onChange = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps = {
    onChange,
  };

  useEffect(() => {

    let interval = null;

    if (!isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(true);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <Navbar />
      <section className="my-28">
        <div className="container-otp">
          <Row justify={"center"} >
            <Col className="text-center">
              <h5 className="my-6 text-4xl">OTP Verification</h5>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col className="pd-12 text-center f-16 b-5xx">
              <h4>Please enter the One-time-password to verify your account</h4>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={7} className="text-center pd-12" >
              <Input.OTP value={otp} onChange={handleMessageChange} formatter={(str) => str.toUpperCase()} {...sharedProps} />
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={6} className="text-center pd-12">
              <h4 className="f-16 b-5xx">OTP expires in <span className="f-16 b-5xx">{formatTime(seconds)}</span></h4>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={10} className="pd-12 text-center">
              <h4 className="f-16 b-5xx">
                {`Didn't receive the Verification code, `}
                <a
                  className={isActive === false ? "disabled" : "resend-anchor"}
                  onClick={handleResend}
                >
                  Click to Resend
                </a>
              </h4>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={6} className="pd-12 text-center">
              <Button style={{ backgroundColor: "#6BB955" }} type="primary" onClick={handleSend}>Continue</Button>
            </Col>
          </Row>
        </div>
      </section>
      <Footer />
    </>
  );
}
