import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/UserController.js";

const routes = express.Router();
routes.get("/user/getAll", getAllUsers);
routes.get("/user/getUserDetails/:id", getUserById);
routes.get("/user/deleteUser/:id", deleteUser);

export default routes;
