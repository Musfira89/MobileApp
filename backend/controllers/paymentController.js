//for payment
export const processPayment = async (req, res) => {
  const { amount, fullName, email, phoneNumber, method, details } = req.body;

  try {
    if (fullName && email && phoneNumber && method && details) {
      console.log("Processing Payment:", {
        amount,
        fullName,
        email,
        phoneNumber,
        method,
        details,
      });

      return res
        .status(200)
        .json({ success: true, message: "Payment Successful" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Payment Details" });
    }
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ success: false, message: "Payment Failed" });
  }
};
