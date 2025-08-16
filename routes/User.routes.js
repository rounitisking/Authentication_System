import express from "express"
import { registerUser , verifyUser , loginUser ,profileUser , ResetPasswordUser , ForgotPasswordUser , LogoutUser} from "../Controller/User.controller.js"
import verify from "../middleware/auth.middleware.js"
const router = express.Router()
router.post("/registerUser", registerUser)
router.get("/verificationToken/:token",verifyUser)
router.post("/login" , loginUser)
router.get("/viewProfile" ,verify , profileUser)
router.put("/logoutUser" , verify ,LogoutUser)
 
export default router