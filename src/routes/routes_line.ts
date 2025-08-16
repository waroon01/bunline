import { Elysia, t } from "elysia";
import {
  ClientConfig,
  MessageAPIResponseBase,
  messagingApi,
  webhook,
  HTTPFetchError,
  validateSignature,
} from "@line/bot-sdk";
import lineClient from "../config/line_config";
import { validateLineSignature } from "../middleware/validateLine";
import handleEvent from "../handlers/handleEvent";

const channelSecret = process.env.CHANNEL_SECRET || "";

// Handler สำหรับข้อความ
// const textEventHandler = async (event: webhook.Event) => {
//   if (event.type !== "message") {
//     console.log("Not a message event");
//     return;
//   }

//   if (event.message.type !== "text") {
//     console.log("Not a text message");
//     return;
//   }

//   if (!event.replyToken) {
//     console.log("No replyToken, cannot reply");
//     return;
//   }

//   try {
//     const res = await lineClient.replyMessage({
//       replyToken: event.replyToken,
//       messages: [{ type: "text", text: "You said: " + event.message.text }],
//     });
//     // console.log("Reply result:", res);
//   } catch (err) {
//     console.error("Reply failed:", err);
//   }
// };

// export เป็น plugin (ใช้ใน main.ts)
export const lineRoute = new Elysia({ prefix: "/line" })
  .get("/", () => ({
    status: "success",
    message: "LINE route connected!",
  }))

  .post("/callback", async ({ request, set }) => {
    console.log(request)
    try {
      // routes/routes_line.ts
      const { isValid, rawBody } = await validateLineSignature(request, set);

      if (!isValid || !rawBody) {
        set.status = 200;
        return { error: "Invalid signature" };
      }

      // ตอนนี้ TypeScript จะมั่นใจว่า rawBody เป็น string
      const callbackRequest = JSON.parse(rawBody) as webhook.CallbackRequest;

      const events: webhook.Event[] = callbackRequest.events ?? [];

      const results = await Promise.all(
        events.map((event) => handleEvent(event))
      );

      return { status: "success", results };
    } catch (err) {
      console.error(err);
      set.status = 200;
      return { status: "error" };
    }
  });
