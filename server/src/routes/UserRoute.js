import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const routes = express.Router();
routes.get("/user/getAll", authMiddleware, getAllUsers);
routes.get("/user/getUserDetails/:id", authMiddleware, getUserById);
routes.get("/user/deleteUser/:id", authMiddleware, deleteUser);

export default routes;
