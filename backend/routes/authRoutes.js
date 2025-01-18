import express from "express";
import { signUp, login, verifyEmail,checkEmailVerification } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/verify/:email", verifyEmail);
router.get('/check-verification/:email', checkEmailVerification);

export default router;
