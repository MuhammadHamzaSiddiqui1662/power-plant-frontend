"use client";
import { useState } from "react";
import { Row, Col, Checkbox, Card, Rate, Input, Modal, Typography, Button } from 'antd';
const { Title, Paragraph, Text, } = Typography;
import "./ModalCSS.css";

import {
  useAddReviewMutation,
} from "../../../services/user/user";


export default function ReviewModal({ visible, setVisible, brokerId, reviewType }) {
  const [successFullCheck, setSuccessFullCheck] = useState(false)
  const [description, setDescription] = useState("");
  const [negotiationRating, setNegotiationRating] = useState(0);
  const [responsivenessRating, setResponsivenessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [skillsRating, setSkillsRating] = useState(0);
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();

  const handleCancel = async (e) => {
    setVisible(false)
  };

  const successFullCheckboxHandler = (e) => {
    setSuccessFullCheck(e.target.checked)
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value)
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

  const addReviewHandler = async () => {
    try {
      //userIdToReview, reviewType
      
      let review={
        isSuccessfull:successFullCheck,
        description:description,
        negotiation:negotiationRating,
        responsiveness:responsivenessRating,
        communication:communicationRating,
        skills:skillsRating
      }

      console.log(review)

      const { data: addReviewResponse, error } = await addReview({
        brokerId,
        reviewType,
        review
      });
      if (error) return setError(error.message);
      console.log(addReviewResponse);
      if (addReviewResponse._id) {
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
            <Card className="review-card">

              <h1 className="f-24 b-7xx">You are going to dehire now, kindly rate accordingly: </h1>

              <Checkbox className="checkbox-deal" checked={successFullCheck} onChange={successFullCheckboxHandler}><text className="f-18 b-5xx">Successfull deal</text></Checkbox>

              <Input.TextArea
                placeholder="Enter description here"
                className="input-area"
                value={description}
                onChange={descriptionChangeHandler}
              ></Input.TextArea>

              <Row className="pd-18">
                <Col xs={{ span: 8 }}><text className="f-18 b-5xx">Price negotiation</text></Col>
                <Col xs={{ span: 6, offset: 10 }} className="pd-10">
                  <Rate value={negotiationRating} onChange={negotiationRatingHandler}></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Responsiveness</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate value={responsivenessRating} onChange={responsivenessRatingHandler}> </Rate></Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Communication</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate value={communicationRating} onChange={communicationRatingHandler}></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}><text className="f-18 b-5xx">Technical Skills</text></Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate value={skillsRating} onChange={skillsRatingHandler}></Rate>
                </Col>
              </Row>

              <Col span={4} offset={10}>
                <Button className="c-green pd-18-24" type="primary" onClick={addReviewHandler}>Dehire</Button>
              </Col>

            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}


