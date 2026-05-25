import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("PhysioConnect Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});