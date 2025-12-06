import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const ShoppingList = sequelize.define("shoppingList", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_list: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total_discount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
    final_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
}
}, {
    tableName: 'shopping_list',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
export default ShoppingList