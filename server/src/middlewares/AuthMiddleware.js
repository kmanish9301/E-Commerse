import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { db } from "../config/connectDB.js";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { User } = db;
  let token;

  //get token from Authorization token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token - Unauthorized user
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Not authorized, token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const isUserExists = await User.findByPk(decodedToken.id);

    if (!isUserExists) {
      return res.status(401).json({ error: true, message: "User not found" });
    }

    req.user = {
      id: isUserExists.id,
      email: isUserExists.email,
      user_name: isUserExists.user_name,
    };

    next();
  } catch (error) {
    console.log("error:", error);
    return res.status(401).json({
      error: true,
      message: "Invalid or expired token",
    });
  }
});
