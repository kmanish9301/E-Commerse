import UserModel from "./User.js";
import ProductModel from "./Product.js";
import UserProductModel from "./UserProduct.js";

const initModels = (sequelize) => {
  const User = UserModel(sequelize);
  const Product = ProductModel(sequelize);
  const UserProduct = UserProductModel(sequelize);

  // Associations
  User.belongsToMany(Product, {
    through: UserProduct,
    foreignKey: "userId",
    otherKey: "productId",
  });

  Product.belongsToMany(User, {
    through: UserProduct,
    foreignKey: "productId",
    otherKey: "userId",
  });

  return { User, Product, UserProduct };
};

export default initModels;
