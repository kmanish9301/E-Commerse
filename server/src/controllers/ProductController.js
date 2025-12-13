import expressAsyncHandler from "express-async-handler";
import { db } from "../config/connectDB.js";

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const { Product } = db;
});
