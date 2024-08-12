"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Row, Col, Input } from "antd";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import "./style.css";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../services/auth/auth";
import { Alert } from "@mui/material";
import ToastMessage from "../componants/Toast";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import { useDispatch } from "react-redux";
import { setUserType } from "../../lib/features/authSlice";

export default function OTPVerify() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const email = useSearchParams().get("email");
  const userType = useSearchParams().get("userType");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const dispatch = useDispatch();

  const handleMessageChange = (e) => {
    setOTP(e.target.value);
    console.log(otp);
  };

  const handleResend = async () => {
    try {
      const { data: resendOTPResponse, error } = await resendOtp({ email });
      if (error) {
        setError(error.message);
        ToastMessage({ message: "Failed to resend OTP!", type: "error" });
        return;
      }
      ToastMessage({ message: "OTP resent successfully!", type: "success" });

      setSeconds(120);
      setIsActive(false);
      console.log(resendOTPResponse);
    } catch (error) {
      console.log(`errror --> ${error}`);
    }
  };

  const handleSend = async () => {
    try {
      const { data: verifyOtpResponse, error } = await verifyOtp({
        email,
        otp,
      });
      if (error) {
        setError(error.message);
        ToastMessage({ message: "OTP verification failed!", type: "error" });
        return;
      }
      ToastMessage({ message: "OTP verified successfully!", type: "success" });
      dispatch(setUserType(userType));
      console.log(verifyOtpResponse);
      router.replace("/home");
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const onChange = (text) => {
    console.log("onChange:", text);
    setOTP(text);
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <Navbar />
      <section className="my-28">
        <div className="container-otp">
          <Row justify={"center"}>
            <Col md={24} className="text-center">
              <h5 className="my-6 text-4xl">OTP Verification</h5>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col md={24} className="pd-12 text-center f-16 b-5xx">
              <h4>Please enter the One-time-password to verify your account</h4>
            </Col>
          </Row>
          {error && (
            <Row justify={"center"}>
              <Col className="text-center pd-12">
                <Alert
                  variant="outlined"
                  severity="error"
                  className="mb-4 w-80"
                >
                  {error}
                </Alert>
              </Col>
            </Row>
          )}
          <Row justify={"center"}>
            <Col span={24} md={24} className="text-center pd-12">
              <Input.OTP
                value={otp}
                onChange={handleMessageChange}
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={6} md={20} className="text-center pd-12">
              <h4 className="f-16 b-5xx">
                OTP expires in{" "}
                <span className="f-16 b-5xx">{formatTime(seconds)}</span>
              </h4>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={10} md={24} className="pd-12 text-center">
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
            <Col span={6} md={12} className="pd-12 text-center">
              <ButtonContained
                style={{ backgroundColor: "#6BB955" }}
                type="primary"
                onClick={handleSend}
                isLoading={isVerifying || isResending}
                disabled={isVerifying || isResending}
              >
                Continue
              </ButtonContained>
            </Col>
          </Row>
        </div>
      </section>
      <Footer />
    </>
  );
}
