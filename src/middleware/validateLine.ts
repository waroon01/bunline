// middleware/validateLine.ts
import { validateSignature } from "@line/bot-sdk";

const channelSecret = process.env.CHANNEL_SECRET || "";

export const validateLineSignature = async (request: any, set: any) => {
  const signature = request.headers.get("x-line-signature");
  if (!signature) {
    set.status = 200;
    return { isValid: false, rawBody: null };
  }

  const arrayBuffer = await request.arrayBuffer();
  const rawBody = new TextDecoder().decode(arrayBuffer); // string
  const isValid = validateSignature(rawBody, channelSecret, signature);

  return { isValid, rawBody };
};
