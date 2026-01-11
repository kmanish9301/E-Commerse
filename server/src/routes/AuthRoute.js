import express from "express";
import {
  generateAccessToken,
  loginUser,
  registerUser,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/generate-token/:userId", generateAccessToken);
export default router;
