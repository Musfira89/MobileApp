import express from "express";
import {
  saveReservationData,
  getReservationData,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/:id/save-reservation", saveReservationData);
router.get("/:id/get-reservation", getReservationData);

export default router;
