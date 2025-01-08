// authController


import { auth } from "../firebaseConnect.js";
import nodemailer from "nodemailer";

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Sign-Up
export const signUp = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: fullName,
      phoneNumber,
    });

    const verificationLink = `${process.env.APP_URL}/api/auth/verify/${email}`;

    // Send Verification Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>You are almost complete! Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
    });

    res.status(200).json({
      message: "Account created successfully. Check your email for verification.",
      userId: user.uid,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Email Verification
export const verifyEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await auth.getUserByEmail(email);

    if (!user.emailVerified) {
      await auth.updateUser(user.uid, { emailVerified: true });
      res.status(200).json({ message: "Email verified successfully." });
    } else {
      res.status(400).json({ error: "Email already verified." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication handles login on the client side by default.
    // For backend login, you would use Firebase Admin SDK with custom tokens.

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
