import express from "express";
import { registerUser } from "../controllers/AuthController.js";
import { sequelize } from "../config/connectDB.js";

const routes = express.Router();

routes.post("/auth/register", registerUser(sequelize));

export default routes;
