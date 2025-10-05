import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // role: {
      //   type: DataTypes.ENUM("user", "admin"),
      //   default: "user",
      // },
    },
    {
      timestamps: true,
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["original_password", "password"] },
      },
    }
  );

  return User;
};

export default UserModel;
