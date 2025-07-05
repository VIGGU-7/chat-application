import {Router} from 'express'
import { login,signup,logout, updateProfile,checkAuth } from '../controllers/auth.controller.js'
import { authCheck } from '../middleware/authCheck.js'
const router=Router()

router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.put("/update-profile",authCheck,updateProfile)
router.get("/check",authCheck,checkAuth)


export default router