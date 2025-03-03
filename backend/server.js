import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:8081", // Browser frontend
      "http://192.168.0.117:8081", // Expo app frontend
      "http://192.168.100.13:8081"
    ],
    credentials: true,
  })
);



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
