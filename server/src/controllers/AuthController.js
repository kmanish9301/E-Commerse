import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { generateAuthTokens } from "../utils/AuthHelper.js";
import { userValidationSchema } from "../utils/Validators.js";

export const registerUser = (sequelize) =>
  expressAsyncHandler(async (req, res) => {
    const { User } = sequelize.models;

    const validatedData = await userValidationSchema.validate(req.body, {
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
      user: { id: newUser.id, user_name, email, accessToken, refreshToken },
    });
  });
