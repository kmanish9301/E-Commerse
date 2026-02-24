import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import { Op } from "sequelize";
import { db } from "../config/connectDB.js";
import { paginate } from "../utils/Pagination.js";

export const getAllProductsFromFakeStoreAPI = expressAsyncHandler(
  async (req, res) => {
    const { Product } = db;

    // Fetch products from free API
    // Adding headers (User-Agent and Accept-Encoding) to prevent 403 errors on production servers like Render
    const { data } = await axios.get("https://fakestoreapi.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    // Transform API data to match your model
    const formattedProducts = data.map((item) => ({
      external_id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating_rate: item.rating?.rate,
      rating_count: item.rating?.count,
    }));

    // Optional: clear table to avoid duplicates (use once)
    await Product.destroy({ where: {} });

    // Bulk insert (FAST & SAFE)
    const savedProducts = await Product.bulkCreate(formattedProducts, {
      validate: true,
    });

    res.status(201).json({
      success: true,
      message: "Products fetched & stored successfully",
      count: savedProducts.length,
      data: savedProducts,
    });
  }
);

export const products = expressAsyncHandler(async (req, res) => {
  const { Product } = db;

  const { search, category, title, page = 1, limit = 10 } = req.query;

  // Build WHERE condition dynamically
  const where = {};

  // Global search (title + description)
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // Filter by category
  if (category) {
    where.category = category;
  }

  // Filter by title only
  if (title) {
    where.title = { [Op.iLike]: `%${title}%` };
  }

  const data = await paginate(
    Product,
    {
      where,
      order: [["createdAt", "DESC"]],
    },
    Number(page),
    Number(limit)
  );

  res.status(200).json({
    success: true,
    ...data,
  });
});

export const getProductById = expressAsyncHandler(async (req, res) => {
  const { Product } = db;

  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ error: true, message: "Invalid request" });
  }

  const getDetails = await Product.findByPk(id);

  if (!getDetails) {
    return res.status(400).json({ error: true, message: "Product not found" });
  }

  const data = {
    id: getDetails.id,
    external_id: getDetails.external_id,
    title: getDetails.title,
    price: getDetails.price,
    description: getDetails.description,
    category: getDetails.category,
    image: getDetails.image,
    rating_rate: getDetails.rating_rate,
    rating_count: getDetails.rating_count,
    createdAt: getDetails.createdAt,
    updatedAt: getDetails.updatedAt,
  };

  return res.status(200).json({ success: true, product_details: data });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { Product } = db;
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(404).json({ error: true, message: "Invalid request" });
    }

    const isProductExists = await Product.findByPk(id);

    if (!isProductExists) {
      return res
        .status(400)
        .json({ error: true, message: "Product not found" });
    }

    await isProductExists.update(updateData);

    return res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("error: ", error);
  }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { Product } = db;
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: true, message: "Invalid request" });
    }

    const isProductExists = await Product.findByPk(id);

    if (!isProductExists) {
      return res
        .status(400)
        .json({ error: true, message: "Product not found" });
    }

    await isProductExists.destroy();

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("error:", error);
  }
});
