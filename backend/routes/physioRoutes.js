import express from "express";

import {
  createPhysioProfile,
  getAllPhysios,
  getSinglePhysio,
  searchPhysios,
  getMyProfile,
} from "../controllers/physioController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-profile", protect, createPhysioProfile);

router.get("/all", getAllPhysios);

router.get("/search", searchPhysios);

router.get("/my-profile", protect, getMyProfile);
router.get("/:id", getSinglePhysio);
export default router;