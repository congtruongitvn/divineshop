const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('DigitalKey', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  productId: { type: DataTypes.UUID },
  keyValue: { type: DataTypes.TEXT, allowNull: false },
  isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  orderId: { type: DataTypes.UUID },
}, { tableName: 'digital_keys', timestamps: true });
