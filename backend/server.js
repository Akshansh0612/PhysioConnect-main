import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/roleMiddleware.js";
import physioRoutes from "./routes/physioRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/physio", physioRoutes);


app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get(
  "/api/admin",
  protect,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

app.get("/", (req, res) => {
  res.send("PhysioConnect Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});