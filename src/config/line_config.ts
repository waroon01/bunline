import { ClientConfig, messagingApi } from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
};

const lineClient = new messagingApi.MessagingApiClient(clientConfig);

export default lineClient;
