import { Elysia, t } from "elysia";
import {
  webhook,
} from "@line/bot-sdk";
import { validateLineSignature } from "../middleware/validateLine";
import handleEvent from "../handlers/handleEvent";



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
