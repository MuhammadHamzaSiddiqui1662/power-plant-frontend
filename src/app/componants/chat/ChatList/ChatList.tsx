import { Avatar, Stack } from "@mui/material";
import { Badge, Card, Col, Row, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { ChatData } from "../../../../types/chat";
import { User, UserType } from "../../../../types/user";

interface Props {
  chatList: ChatData[];
  extractReceiver: (chat: ChatData) => User;
}

export const ChatList: FC<Props> = ({ chatList, extractReceiver }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const chatClickHandler = (chatId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("chatId", chatId);
    router.push(`/chat?${params.toString()}`);
  };

  return (
    <Col
      xs={22}
      md={22}
      lg={6}
      xl={6}
      xxl={6}
      className="h-full border custom-border rounded-2xl"
    >
      <div className="p-4 h-full max-h-full flex flex-col overflow-y-auto gap-4">
        <h1 className="f-32 b-6xx">Messages</h1>

        <div className="chat-container h-full flex flex-col gap-2">
          {chatList.map((chat) => {
            const receiver = extractReceiver(chat);
            return (
              <Card
                key={chat._id}
                className={`chat-card ${chatId === chat._id ? "active" : ""}`}
                onClick={() => chatClickHandler(chat._id)}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  spacing={1}
                  className="pd-12"
                >
                  {receiver != null && receiver.online === true ? (
                    <Badge status="success" dot offset={[-6, 36]}>
                      <Avatar
                        src={receiver.imageUrl}
                        alt={receiver.name}
                        className="h-5x w-5x"
                      ></Avatar>
                    </Badge>
                  ) : (
                    <Avatar
                      src={receiver.imageUrl}
                      alt={receiver.name}
                      className="h-5x w-5x"
                    >
                      {" "}
                    </Avatar>
                  )}
                  <Stack direction="column" spacing={0.5} width={"100%"}>
                    <Stack direction="row" alignItems={"center"} spacing={1}>
                      <Typography.Text className="f-16 b-7xx">
                        {receiver.name}
                      </Typography.Text>
                      <p
                        className="leading-3 text-[12px] px-2 py-1 border rounded"
                        style={{
                          color: "#6BB955",
                          borderColor: "#6BB955",
                        }}
                      >
                        {UserType[receiver.type]}
                      </p>
                    </Stack>
                    <Typography.Text
                      className="f-12 c-grey"
                      // @ts-ignore
                      ellipsis={{ rows: 1 }}
                    >
                      {chat.lastMessage}
                    </Typography.Text>
                  </Stack>
                  {chat.unReadMessages > 0 && (
                    <Badge
                      color="green"
                      count={chat.unReadMessages}
                      // offset={[80, 20]}
                    ></Badge>
                  )}
                </Stack>
              </Card>
            );
          })}
        </div>
      </div>
    </Col>
  );
};
