import chalk from "chalk";
import { Sequelize } from "sequelize";
import initModels from "../models/index.js";

let sequelize;
let db;

export const connectDB = async () => {
  if (sequelize && db) return { sequelize, db }; // prevent reinitialization

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: false,
    }
  );

  // console.log("Connecting to PostgreSQL:", {
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  // });

  try {
    await sequelize.authenticate();
    console.log(chalk.green("✅ Database connected"));

    db = initModels(sequelize);
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    console.log(chalk.green("✅ Tables synced"));

    return { sequelize, db };
  } catch (err) {
    console.error(chalk.red("❌ DB connection failed:"), err);
    process.exit(1);
  }
};

export { db, sequelize };
