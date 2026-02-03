import express from "express";
import Task from "../models/Task.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // all routes need auth

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json({ success: true, data: tasks });
});

// POST create task
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ success: false, message: "Title required" });
  const task = await Task.create({ title, user: req.user.id });
  res.status(201).json({ success: true, data: task });
});

// PUT update task
router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
});

// DELETE task
router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
});

export default router;
