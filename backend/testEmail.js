import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ansarimusfira789@gmail.com",
    pass: "gklz sjmx svpq xtzu",
  },
});

const mailOptions = {
  from: "ansarimusfira789@gmail.com",
  to: "musfiraansari05@gmail.com",
  subject: "Test Email",
  text: "This is a test email from Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
