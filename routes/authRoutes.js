import express from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/authController.js";
// import upload from "../middleware/uploadMiddleware.js";
import profileImageUpload from '../middleware/uploadMiddleware.js'
const router = express.Router();

// router.post("/register", register);
// router.post("/register", upload.single("profileImage"), register);
router.post("/register", profileImageUpload.single("profileImage"), register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
