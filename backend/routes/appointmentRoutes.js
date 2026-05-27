import express from "express";

import {
  bookAppointment,
  getMyAppointments,
  getPhysioAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, bookAppointment);

router.get("/my-appointments", protect, getMyAppointments);

router.get("/physio-appointments", protect, getPhysioAppointments);

router.put(
  "/update-status/:appointmentId",
  protect,
  updateAppointmentStatus
);

router.delete(
  "/cancel/:appointmentId",
  protect,
  cancelAppointment
);

export default router;