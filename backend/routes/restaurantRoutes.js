import express from "express";
import {
  getAllRestaurants,
  getRestaurantDetails,checkReservationAvailability
} from "../controllers/restaurantController.js";

const router = express.Router();
// Route to fetch all restaurants
router.get("/", getAllRestaurants);

// Route to fetch details of a single restaurant
router.get("/:id", getRestaurantDetails);

router.post("/:id/check-reservation", checkReservationAvailability);



export default router;
