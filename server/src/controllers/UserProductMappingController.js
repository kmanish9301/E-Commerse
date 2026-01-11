import expressAsyncHandler from "express-async-handler";
import { db } from "../config/connectDB.js";

export const addToCart = expressAsyncHandler(async (req, res) => {
  try {
    const { UserProduct, Product } = db;

    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;
    console.log("🚀 ~ userId:", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ error: true, message: "UserId not provided" });
    }
    if (!productId) {
      return res
        .status(400)
        .json({ error: true, message: "ProductId not provided" });
    }

    const isProductExists = await Product.findByPk(productId);

    if (!isProductExists) {
      return res
        .status(400)
        .json({ error: true, message: "Product not found" });
    }

    // Upsert the Item
    // isCreated	    What happened in DB
    // true	          New cart row inserted
    // false	        Existing cart row found

    const [cartItem, isCreated] = await UserProduct.findOrCreate({
      where: { userId, productId },
      default: { quantity },
    });

    if (!isCreated) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return res.status(200).json({
      success: true,
      message: isCreated ? "Product added to cart" : "Cart updated",
    });
  } catch (error) {
    console.log("error:", error);
  }
});

export const getUsersCartDetails = expressAsyncHandler(async (req, res) => {
  try {
    const { Product, UserProduct } = db;
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: true, message: "userId not provided" });
    }

    const cart = await UserProduct.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "title", "price", "image"],
        },
      ],
    });

    if (!cart.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: "Cart is empty",
      });
    }

    return res.status(200).json({
      success: true,
      count: cart.length,
      data: cart,
    });
  } catch (error) {
    console.log("error : ", error);
  }
});
