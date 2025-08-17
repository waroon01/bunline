import { webhook } from "@line/bot-sdk";
import lineClient from "../config/line_config";
import { Message } from "@line/bot-sdk/dist/messaging-api/api";

export const replyMessageLine = async(event: webhook.MessageEvent, messageSend: Message)=>{
    // Check if message is repliable
  if (!event.replyToken) return;
  
  
  await lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [messageSend]
  })
}