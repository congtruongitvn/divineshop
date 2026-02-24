const { DataTypes } = require('sequelize');

const sequelize = require('./db');

const DigitalKey = sequelize.define('DigitalKey', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER },
  keyValue: { type: DataTypes.TEXT, allowNull: false },
  isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  orderId: { type: DataTypes.INTEGER },
}, { timestamps: true });

module.exports = DigitalKey;
