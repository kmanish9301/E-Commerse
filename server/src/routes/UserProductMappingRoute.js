import express from "express";
import {
  addToCart,
  getUsersCartDetails,
} from "../controllers/UserProductMappingController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);
router.get("/get-user-carts", authMiddleware, getUsersCartDetails);

export default router;
