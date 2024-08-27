"use client";
import { useState } from "react";
import {
  Row,
  Col,
  Checkbox,
  Card,
  Rate,
  Input,
  Modal,
  Typography,
  Button,
} from "antd";
const { Title, Paragraph, Text } = Typography;
import "./ModalCSS.css";

import { useAddReviewMutation } from "../../../services/user/user";
import { ReviewType } from "../../../types/ReviewType";

import { useUpdateChatMutation } from "../../../services/chat/chat";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { EventEmitter } from "events";
const emitter = new EventEmitter();


export default function ReviewModal({
  visible,
  setVisible,
  sendReviewMessage,
  brokerId,
  userType,
  isReviewBtnClicked,
  chat,
  refresh
}) {
  const [successFullCheck, setSuccessFullCheck] = useState(false);
  const [description, setDescription] = useState("");
  const [negotiationRating, setNegotiationRating] = useState(0);
  const [responsivenessRating, setResponsivenessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [skillsRating, setSkillsRating] = useState(0);
  const [behaviourRating, setBehaviourRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [updateChat, { isLoading: isUpdating }] = useUpdateChatMutation();
  const router = useRouter();

  const handleCancel = async (e) => {
    setSuccessFullCheck(false);
    setDescription("");
    setNegotiationRating(0);
    setResponsivenessRating(0);
    setCommunicationRating(0);
    setSkillsRating(0);

    setVisible(false);
  };

  const successFullCheckboxHandler = (e) => {
    setSuccessFullCheck(e.target.checked);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const negotiationRatingHandler = (value) => {
    setNegotiationRating(value);
  };

  const responsivenessRatingHandler = (value) => {
    setResponsivenessRating(value);
  };

  const communicationRatingHandler = (value) => {
    setCommunicationRating(value);
  };

  const skillsRatingHandler = (value) => {
    setSkillsRating(value);
  };

  const behaviourRatingHandler = (value) => {
    setBehaviourRating(value);
  };

  const getReviewType = (type) => {
    if (type == 0) {
      return ReviewType.ReviewsAsInnovator;
    }
    if (type == 1) {
      return ReviewType.ReviewsAsInvestor;
    }
    if (type == 2) {
      return ReviewType.ReviewsAsBorker;
    }
  };

  const addReviewHandler = async () => {
    try {

      let reviewType = getReviewType(userType);

      let review = {
        userId: brokerId,
        reviewType: reviewType,
        data: {
          dealSuccessFul: successFullCheck,
          comments: description,
          behaviour: behaviourRating,
          priceNegotiation: negotiationRating,
          responsiveness: responsivenessRating,
          communication: communicationRating,
          technicalSkills: skillsRating,
          userId: user._id,
        },
      };
      const { data: addReviewResponse, error } = await addReview(review);
      if (error) return setError(error.message);
      if (addReviewResponse.message) {
        if(isReviewBtnClicked){
          let newChatObject = { ...chat, closed: true };
          const { data: updateChatResponse, error } = await updateChat(newChatObject);
          if (error) return setError(error.message);
          console.log(updateChatResponse)
          refresh();
        }
        else{
        let newChatObject = { ...chat, reviewed: true };
        const { data: updateChatResponse, error } = await updateChat(newChatObject);
        if (error) return setError(error.message);
        sendReviewMessage(updateChatResponse._id, user._id, brokerId, );
        }
      }

      handleCancel();
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
        // bodyStyle={{ maxHeight: "600px" }}
        footer={null} //
      >
        <Row justify={"center"}>
          <Col span={24}>
            <Card className="review-card">
              <h1 className="f-24 b-7xx">
                You are going to dehire now, kindly rate accordingly:{" "}
              </h1>

              <Checkbox
                className="checkbox-deal"
                checked={successFullCheck}
                onChange={successFullCheckboxHandler}
              >
                <text className="f-18 b-5xx">Successfull deal</text>
              </Checkbox>

              <Input.TextArea
                placeholder="Enter description here"
                className="input-area"
                value={description}
                onChange={descriptionChangeHandler}
              ></Input.TextArea>

              <Row className="pd-18">
                <Col xs={{ span: 8 }}>
                  <text className="f-18 b-5xx">Price negotiation</text>
                </Col>
                <Col xs={{ span: 6, offset: 10 }} className="pd-10">
                  <Rate
                    value={negotiationRating}
                    onChange={negotiationRatingHandler}
                  ></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}>
                  <text className="f-18 b-5xx">Responsiveness</text>
                </Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate
                    value={responsivenessRating}
                    onChange={responsivenessRatingHandler}
                  >
                    {" "}
                  </Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}>
                  <text className="f-18 b-5xx">Communication</text>
                </Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate
                    value={communicationRating}
                    onChange={communicationRatingHandler}
                  ></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}>
                  <text className="f-18 b-5xx">Technical Skills</text>
                </Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate
                    value={skillsRating}
                    onChange={skillsRatingHandler}
                  ></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}>
                  <text className="f-18 b-5xx">Behaviour</text>
                </Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate
                    value={behaviourRating}
                    onChange={behaviourRatingHandler}
                  ></Rate>
                </Col>
              </Row>

              <Col span={4} offset={10}>
                <Button
                  className="c-green pd-18-24"
                  type="primary"
                  onClick={addReviewHandler}
                >
                  Dehire
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
