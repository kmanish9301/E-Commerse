import { DataTypes } from "sequelize";

const UserProductModel = (sequelize) => {
  const UserProduct = sequelize.define("UserProduct", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return UserProduct;
};

export default UserProductModel;
