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

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/update-user").patch(authenticateUser, updateUser);
router.route("/reset-password/").post(apiLimiter, resetPassword);
router
  .route("/update-password/")
  .post(apiLimiter, authenticateUser, updatePassword);

export default router;
