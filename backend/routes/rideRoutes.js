import express from "express";
import { confirmRide} from "../controllers/rideController.js";

const router = express.Router();

// POST /api/rides
router.post("/rides", confirmRide);

export default router;