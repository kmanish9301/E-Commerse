import express from "express";
import {
  deleteProduct,
  getAllProductsFromFakeStoreAPI,
  getProductById,
  products,
  updateProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/getAllProductsFromStore", getAllProductsFromFakeStoreAPI);
router.get("/get-all-products", products);
router.get("/get-product-details/:id", getProductById);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
