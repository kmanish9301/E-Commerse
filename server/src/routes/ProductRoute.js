import express from "express";
import {
  deleteProduct,
  getAllProductsFromFakeStoreAPI,
  getProductById,
  products,
  updateProduct,
} from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/getAllProductsFromStore", authMiddleware, getAllProductsFromFakeStoreAPI);
router.get("/get-all-products", authMiddleware, products);
router.get("/get-product-details/:id", authMiddleware, getProductById);
router.put("/update-product/:id", authMiddleware, updateProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

export default router;
