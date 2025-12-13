import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./src/config/connectDB.js";
import {
  NotFoundError,
  errorHandler,
} from "./src/middlewares/ErrorMiddleware.js";
import authRoutes from "./src/routes/AuthRoute.js";
import userRoutes from "./src/routes/UserRoute.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// console.log("NODE_ENV =", process.env.NODE_ENV);
// console.log("DB_NAME =", process.env.DB_NAME);

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ✅ Initialize DB ONCE
await connectDB();

// ✅ Mount routes (no need to pass sequelize)
app.use("/v1", authRoutes);
app.use("/v1", userRoutes);

// 404 + error handlers
app.use(NotFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

app.listen(PORT, () =>
  console.log(chalk.green.bold(`🚀 Server running at ${APP_URL}`))
);
