import expressAsyncHandler from "express-async-handler";
import { Op } from "sequelize";
import { db } from "../config/connectDB.js";
import { paginate } from "../utils/Pagination.js";

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const { User } = db;
  const { search, user_name, email, page = 1, limit = 10 } = req.query;

  const where = {};

  if (user_name) {
    where.user_name = { [Op.iLike]: `%${user_name}%` };
  }
  if (email) {
    where.email = { [Op.iLike]: `%${email}%` };
  }
  if (search) {
    where[Op.or] = [
      { user_name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const data = await paginate(
    User,
    { where, attributes: ["id", "user_name", "email"] },
    Number(page),
    Number(limit)
  );

  if (data.results.length === 0) {
    return res.status(404).json({ success: false, message: "No users found" });
  }

  res.status(200).json({
    success: true,
    ...data,
  });
});

export const getUserById = expressAsyncHandler(async (req, res) => {
  const { User } = db;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: true, message: "Id not provided" });
  }
  const fetchUserDetails = await User.findByPk(id);
  if (!fetchUserDetails) {
    return res.status(400).json({ error: true, message: "User not found" });
  }
  const userData = {
    id: fetchUserDetails.id,
    user_name: fetchUserDetails.user_name,
    email: fetchUserDetails.email,
  };
  return res.status(200).json({ success: true, user_details: userData });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { User } = db;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: true, message: "Id not provided" });
  }
  const fetchUserDetails = await User.findByPk(id);
  if (!fetchUserDetails) {
    return res.status(400).json({ error: true, message: "User not found" });
  }
  await fetchUserDetails.destroy();
  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully!" });
});
