import express from "express";
import { createPhysioProfile } from "../controllers/physioController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-profile", protect, createPhysioProfile);

export default router;