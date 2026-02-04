import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/api/v1/health", (_, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
