"use client";
import { FC, useState } from "react";
import { Row, Col, Checkbox, Card, Rate, Input, Modal, Button } from "antd";
import { Review } from "../../../../types/ReviewType";
import { useSelector } from "react-redux";
import "./style.css";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleReviewSubmit: (review: Review) => void;
}

export const ReviewModal: FC<Props> = ({
  visible,
  setVisible,
  handleReviewSubmit,
}) => {
  const [successFullCheck, setSuccessFullCheck] = useState(false);
  const [description, setDescription] = useState("");
  const [negotiationRating, setNegotiationRating] = useState(0);
  const [responsivenessRating, setResponsivenessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [skillsRating, setSkillsRating] = useState(0);
  const [behaviourRating, setBehaviourRating] = useState(0);
  const { user } = useSelector((state: any) => state.auth);

  const handleSubmit = () => {
    const review: Review = {
      dealSuccessFul: successFullCheck,
      comments: description,
      behaviour: behaviourRating,
      priceNegotiation: negotiationRating,
      responsiveness: responsivenessRating,
      communication: communicationRating,
      technicalSkills: skillsRating,
      userId: user._id,
    };
    handleReviewSubmit(review);
    handleCancel();
  };

  const handleCancel = async () => {
    setSuccessFullCheck(false);
    setDescription("");
    setNegotiationRating(0);
    setResponsivenessRating(0);
    setCommunicationRating(0);
    setSkillsRating(0);

    setVisible(false);
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
                onChange={(e) => setSuccessFullCheck(e.target.checked)}
              >
                <text className="f-18 b-5xx">Successfull deal</text>
              </Checkbox>

              <Input.TextArea
                placeholder="Enter description here"
                className="input-area"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Input.TextArea>

              <Row className="pd-18">
                <Col xs={{ span: 8 }}>
                  <text className="f-18 b-5xx">Price negotiation</text>
                </Col>
                <Col xs={{ span: 6, offset: 10 }} className="pd-10">
                  <Rate
                    value={negotiationRating}
                    onChange={(value) => setNegotiationRating(value)}
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
                    onChange={(value) => setResponsivenessRating(value)}
                  ></Rate>
                </Col>
              </Row>
              <Row className="pd-18">
                <Col xs={{ span: 6 }}>
                  <text className="f-18 b-5xx">Communication</text>
                </Col>
                <Col xs={{ span: 6, offset: 12 }} className="pd-10">
                  <Rate
                    value={communicationRating}
                    onChange={(value) => setCommunicationRating(value)}
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
                    onChange={(value) => setSkillsRating(value)}
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
                    onChange={(value) => setBehaviourRating(value)}
                  ></Rate>
                </Col>
              </Row>

              <Col span={4} offset={10}>
                <Button
                  className="c-green pd-18-24"
                  type="primary"
                  onClick={handleSubmit}
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
};
