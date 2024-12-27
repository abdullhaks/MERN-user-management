import express from "express";
import { adminSignIn, adminsignOut } from "../../Controller/AdminController/adminAuthCtrl.js";
import User from "../../Models/UserModels/userModel.js";

const router = express.Router();

router.post("/signin", adminSignIn);
router.post("/sign-out",adminsignOut);

router.get(
  "/users",
 async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  }
);

router.put(
  "/users/:id",
 async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  }
);

router.patch(
  "/users/:id/block",
  async (req, res) => {
    const { id } = req.params;
    const { isBlocked } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { isBlocked }, { new: true });
    res.status(200).json(updatedUser);
  }
);

router.delete(
  "/users/:id",
 async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  }
);

export default router;
