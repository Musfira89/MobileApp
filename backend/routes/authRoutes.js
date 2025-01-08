import express from "express";
import { signUp, login, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/verify/:email", verifyEmail);

export default router;
