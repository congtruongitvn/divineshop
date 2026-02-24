const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const sequelize = require('./db');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER },
  productId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

module.exports = OrderItem;
