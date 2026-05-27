import express from "express";

import {
  createReview,
  getPhysioReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createReview);

router.get("/physio/:physioId", getPhysioReviews);

export default router;