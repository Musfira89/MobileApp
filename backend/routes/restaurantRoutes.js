import express from "express";
import {
  getAllRestaurants,
  getRestaurantDetails,
} from "../controllers/restaurantController.js";

const router = express.Router();

// Route to fetch all restaurants
router.get("/", getAllRestaurants);

// Route to fetch details of a single restaurant
router.get("/:id", getRestaurantDetails);

export default router;
