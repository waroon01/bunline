import 'dotenv/config'; // หรือใช้ dotenv แบบปกติ
import { Elysia } from "elysia";
import { lineRoute } from "../src/routes/routes_line";
import { apiRoute } from '../src/routes/routes_api';

const app = new Elysia()
  .use(lineRoute)
  .use(apiRoute)
  
  .get("/", () => "Hello Elysia")
// ❌ ไม่ต้อง listen() บน Vercel
export default app.handle; // ต้อง export default handler
