import { webhook } from "@line/bot-sdk";
import lineClient from "../config/line_config";
import { Message } from "@line/bot-sdk/dist/messaging-api/api";

export const textEventHandler = async (event: webhook.Event) => {
  // ตรวจสอบ event type ก่อน
  if (event.type !== "message" || event.message.type !== "text") return;

  const textHandler = event.message.text;
  console.log(textHandler);

  switch (textHandler) {
    case "สวัสดี":
      const messageSend: Message = { type: "text", text: "สวัสดีครับ" };
      await replyMessageLine(event, messageSend);
      break;
  }
};

const replyMessageLine = async(event: webhook.MessageEvent, messageSend: Message)=>{
    // Check if message is repliable
  if (!event.replyToken) return;
  
  
  await lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [messageSend]
  })
}
