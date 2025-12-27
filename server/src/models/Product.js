import { DataTypes } from "sequelize";

const ProductModel = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      external_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },

      category: {
        type: DataTypes.STRING,
      },

      image: {
        type: DataTypes.STRING,
      },

      rating_rate: {
        type: DataTypes.FLOAT,
      },

      rating_count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  return Product;
};

export default ProductModel;
