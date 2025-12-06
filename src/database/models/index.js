import sequelize from '../sequelize.js';
import User from './User.js';
import ShoppingList from './ShoppingList.js';

// Establece asociaciones
User.hasMany(ShoppingList, {
  foreignKey: 'user_id',
  as: 'shoppingLists'
});

ShoppingList.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

export { sequelize };
export { User, ShoppingList };