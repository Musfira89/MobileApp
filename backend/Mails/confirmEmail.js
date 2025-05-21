import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async ({
  to,
  name,
  restaurantName,
  reservationId,
  date,
  time,
  guests,
  totalBill,
  specialRequest,
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Your Reservation at ${restaurantName} is Confirmed!`,
    html: `
      <h2>Your Reservation has been confirmed</h2>
      <p>Thank you for using our app to book your dining reservation at <strong>${restaurantName}</strong>!</p>
      <hr/>
      <p><strong>Reservation ID:</strong> ${reservationId}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Total Bill:</strong> $${totalBill}</p>
      <p><strong>Special Request:</strong> ${specialRequest}</p>
      <hr/>
      <p>Thank you for choosing us! For queries: <a href="mailto:${process.env.FEEDBACK_EMAIL}">${process.env.FEEDBACK_EMAIL}</a></p>
      <br/>
      <p>Regards,<br/>${process.env.APP_NAME}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email sending failed: " + error.message);
  }
};

export default sendConfirmationEmail;
