import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000, // 15 minutes,
  max: 10,
  message: "too many requests",
});

import {
  register,
  login,
  updateUser,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-user").patch(authenticateUser, updateUser);
router.route("/reset-password/").post(resetPassword);
router.route("/update-password/").post(authenticateUser, updatePassword);

export default router;
