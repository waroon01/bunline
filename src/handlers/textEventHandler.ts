import { webhook } from "@line/bot-sdk";
import { Message } from "@line/bot-sdk/dist/messaging-api/api";
import { replyMessageLine } from "../utils/replyMessagLine";

export const textEventHandler = async (event: webhook.Event) => {
  // ตรวจสอบ event type ก่อน
  if (event.type !== "message" || event.message.type !== "text") return;

  const textHandler = event.message.text;
  console.log(textHandler);
  let messageSend: Message;
  switch (textHandler) {
    case "สวัสดี":
      messageSend = { type: "text", text: "สวัสดีครับ" };
      break;
    default:
      messageSend = {
        type: "flex",
        altText: "this is a flex message",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Brown Cafe",
                weight: "bold",
                size: "xl",
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [],
            flex: 0,
          },
        },
      };
  }
  await replyMessageLine(event, messageSend);
};
