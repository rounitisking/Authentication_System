import express from "express"
import { registerUser , verifyUser , loginUser} from "../Controller/User.controller.js"
const router = express.Router()
router.post("/registerUser", registerUser)
router.get("/verificationToken/:token",verifyUser)
router.post("/login" , loginUser)
 
export default router