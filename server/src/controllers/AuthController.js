import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { db } from "../config/connectDB.js";
import { generateAuthTokens } from "../utils/AuthHelper.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../utils/Validators.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { User } = db;

  const validatedData = await registerValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  const { user_name, email, password } = validatedData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    user_name,
    email,
    password: hashedPassword,
    original_password: password,
  });

  const { accessToken, refreshToken } = generateAuthTokens(newUser);
  newUser.refreshToken = refreshToken;
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    // user: { id: newUser.id, user_name, email, accessToken, refreshToken },
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { User } = db;

  const validateData = await loginValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  const { email, password } = validateData;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and Password are required" });
  }

  const checkUserExists = await User.findOne({ where: { email } });

  if (!checkUserExists) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    checkUserExists.password
  );

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid credential provided" });
  }

  const { accessToken, refreshToken } = generateAuthTokens(checkUserExists);
  checkUserExists.accessToken = accessToken;
  checkUserExists.refreshToken = refreshToken;

  await checkUserExists.save();

  return res.status(200).json({
    success: true,
    message: "Login Successful",
    user_details: {
      id: checkUserExists?.id,
      user_name: checkUserExists?.user_name,
      email: checkUserExists.email,
      accessToken: accessToken,
    },
  });
});
