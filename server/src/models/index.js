import UserModel from "./User.js";
import ProductModel from "./Product.js";
import UserProductModel from "./UserProduct.js";

const initModels = (sequelize) => {
  // Initialize models
  const User = UserModel(sequelize);
  const Product = ProductModel(sequelize);
  const UserProduct = UserProductModel(sequelize);

  // Define associations
  User.belongsToMany(Product, {
    through: UserProduct,
    as: "products",
    foreignKey: "userId",
    otherKey: "productId",
    onDelete: "CASCADE",
  });

  Product.belongsToMany(User, {
    through: UserProduct,
    as: "users",
    foreignKey: "productId",
    otherKey: "userId",
    onDelete: "CASCADE",
  });

  // Return all models as a single object
  return { User, Product, UserProduct };
};

export default initModels;
