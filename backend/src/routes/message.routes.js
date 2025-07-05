import { Router } from "express";
import { authCheck } from "../middleware/authCheck.js";
import { getUserForSidebar,getMessages, sendMessage } from "../controllers/message.controller.js";
const router=Router()


router.get("/users",authCheck,getUserForSidebar)
router.get("/:id",authCheck,getMessages)
router.post("/send/:id",authCheck,sendMessage)
export default router;