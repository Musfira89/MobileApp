// routes/reservationRoutes.js
import express from "express";
import {
  saveReservationData,
  createReservation,
  getReservationData
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/:id/save-reservation", saveReservationData);
router.get("/:id/get-reservation", getReservationData);
router.post("/:id/create", createReservation);

export default router;
