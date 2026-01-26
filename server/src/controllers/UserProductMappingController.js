import expressAsyncHandler from "express-async-handler";
import { db } from "../config/connectDB.js";

export const addToCart = expressAsyncHandler(async (req, res) => {
  try {
    const { UserProduct, Product } = db;

    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

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

export const updateUserCart = expressAsyncHandler(async (req, res) => {
  try {
    const { UserProduct } = db;
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        error: true,
        message: "productId not provided",
      });
    }

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({
        error: true,
        message: "Quantity must be >= 1",
      });
    }

    // Update ONLY this user's cart
    const [updatedCount] = await UserProduct.update(
      { quantity },
      { where: { userId, productId } },
    );

    if (updatedCount === 0) {
      return res.status(404).json({
        error: true,
        message: "Product not found in cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

export const deleteUserCart = expressAsyncHandler(async (req, res) => {
  try {
    const { UserProduct } = db;
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: true,
        message: "productId not provided",
      });
    }

    const deletedCount = await UserProduct.destroy({
      where: {
        userId,
        productId,
      },
    });

    if (deletedCount === 0) {
      return res
        .status(400)
        .json({ error: true, message: "Product not found in cart" });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error("Delete cart error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});
