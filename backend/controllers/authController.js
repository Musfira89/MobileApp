import { auth } from "../firebaseConnect.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email Template
const getEmailTemplate = (appName, confirmationLink) => `
  <div style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center;">
    <h2 style="color: #e6b800;">Please verify your email address for ${appName}</h2>
    <p>Thanks for signing up for <strong>${appName}</strong>! To access your account, please confirm your email address.</p>
    <p>After that, you can access our services.</p>
    <a href="${confirmationLink}" 
       style="display: inline-block; margin: 20px auto; padding: 10px 20px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 5px;">
       Go to email confirmation
    </a>
    <p>If you have any questions, don’t hesitate to reach out to us at <a href="mailto:${process.env.FEEDBACK_EMAIL}" style="color: #e6b800;">${process.env.FEEDBACK_EMAIL}</a></p>
    <p>Thanks,<br>${appName}</p>
  </div>
`;

// Sign-Up Controller
export const signUp = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Create User in Firebase Authentication
    const user = await auth.createUser({
      email,
      password,
      displayName: fullName,
      phoneNumber,
    });

    // Generate Firebase Email Verification Link
    const confirmationLink = await auth.generateEmailVerificationLink(email);

    // Send Email with Nodemailer
    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`, // Sender name and email
      to: email, // Recipient email
      subject: `Please verify your email address for ${process.env.APP_NAME}`,
      html: getEmailTemplate(process.env.APP_NAME, confirmationLink),
    });

    // Send Response
    res.status(200).json({
      message: "Account created successfully. Check your email for verification.",
      userId: user.uid,
    });
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Email Verification Controller (Optional)
export const verifyEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await auth.getUserByEmail(email);

    if (user.emailVerified) {
      return res.status(400).json({ error: "Email is already verified." });
    }

    res.status(200).json({
      message: "Verification email pending. Check your inbox.",
    });
  } catch (error) {
    console.error("Error during email verification:", error.message);
    res.status(400).json({ error: error.message });
  }
};
export const checkEmailVerification = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await auth.getUserByEmail(email);
    if (user.emailVerified) {
      return res.status(200).json({ verified: true });
    }
    return res.status(200).json({ verified: false });
  } catch (error) {
    console.error("Error checking email verification status:", error.message);
    res.status(400).json({ error: error.message });
  }
};


// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication handles login on the frontend.
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(400).json({ error: error.message });
  }
};
