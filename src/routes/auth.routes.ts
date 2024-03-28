import { Router } from "express";
import authController from '../controllers/auth.controller'
import { isLoggedin } from "../middlewares/auth";

export const router = Router()

router.post("/login", authController.login)
router.post("/signup", authController.signup)
router.get("/auth/google", authController.googleLogin)
router.get("/auth/google/callback", authController.googleCallback)
router.get('/auth/google/success', isLoggedin, authController.googleSuccess)
router.get('/auth/google/failure', authController.googleFailure)

export default router