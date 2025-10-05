import express from "express";
import { registerUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/auth/register", registerUser);

export default router;
