import sequelize from '../sequelize.js';
import User from './User.js';
import Ticket from './Ticket.js';

// Establece asociaciones
User.hasMany(Ticket, {
  foreignKey: 'user_id',
  as: 'tickets'
});

Ticket.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

export { sequelize };
export { User, Ticket };