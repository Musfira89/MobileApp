import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";
import reservationsRoutes from "./routes/reservationRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import rideRoutes from './routes/rideRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins (for testing only)
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api', bookingRoutes);
app.use('/api', rideRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
