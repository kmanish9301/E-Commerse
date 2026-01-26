import express from "express";
import {
  addToCart,
  deleteUserCart,
  getUsersCartDetails,
  updateUserCart,
} from "../controllers/UserProductMappingController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);
router.get("/get-user-carts", authMiddleware, getUsersCartDetails);
router.put("/update-user-carts", authMiddleware, updateUserCart);
router.delete("/delete-user-carts/:productId", authMiddleware, deleteUserCart);

export default router;
