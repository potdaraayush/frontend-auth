import express from "express";
import User from "../models/User.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET current user profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT update user profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
