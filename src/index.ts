import 'dotenv/config'; // หรือใช้ dotenv แบบปกติ
import { Elysia } from "elysia";
import { lineRoute } from "./routes/routes_line";
import { apiRoute } from './routes/routes_api';

const app = new Elysia()
  .use(lineRoute)
  .use(apiRoute)
  
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
