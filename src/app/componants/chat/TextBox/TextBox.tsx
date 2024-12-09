import React, { FC, FormEvent, useCallback, useState } from "react";
import { MessageType } from "../../../../types/MessageType";
import { Box } from "@mui/material";
import { ConfigProvider, Input } from "antd";

interface Props {
  handleSendMessage: (content: string, type: MessageType) => void;
  disabled?: boolean;
}

export const TextBox: FC<Props> = ({ disabled, handleSendMessage }) => {
  const [textMessage, setTextMessage] = useState("");

  const sendMessageHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        handleSendMessage(textMessage, MessageType.Text);
        setTextMessage("");
      } catch (error) {
        console.log(`error --> ${error}`);
      }
    },
    [textMessage, setTextMessage, handleSendMessage]
  );

  return (
    <Box
      className="message-box flex"
      component={"form"}
      onSubmit={sendMessageHandler}
    >
      <Input
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        className="input-message border-none focus:shadow-none"
        placeholder="Type your messages here"
        disabled={disabled}
      ></Input>

      <ConfigProvider wave={{ disabled: true }}>
        <button type="submit" className="send-btn" disabled={disabled}>
          <img className="send-btn-image" src="/images/payment/sendBtn.png" />
        </button>
      </ConfigProvider>
    </Box>
  );
};
