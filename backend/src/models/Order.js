const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const sequelize = require('./db');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('pending','paid','processing','completed','cancelled'), defaultValue: 'pending' },
  paymentMethod: { type: DataTypes.STRING },
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'unpaid' },
  notes: { type: DataTypes.TEXT },
}, { timestamps: true });

module.exports = Order;
