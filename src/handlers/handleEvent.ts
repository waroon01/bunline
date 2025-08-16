import { webhook } from "@line/bot-sdk";
import { textEventHandler } from "./textEventHandler";

// ฟังก์ชัน handleEvent แยก
const handleEvent = async (event: webhook.Event) => {
  try {
    // ถ้าเป็นข้อความ ให้ใช้ textEventHandler
    if (event.type === "message") {        
        if(event.message.type === "text"){
            textEventHandler(event)
        }
    }
  } catch (err) {
    console.error("Event handling error:", err);
    return null;
  }
};

export default handleEvent;