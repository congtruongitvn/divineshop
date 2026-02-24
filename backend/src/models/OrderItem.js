const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('OrderItem', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  orderId: { type: DataTypes.UUID },
  productId: { type: DataTypes.UUID },
  productName: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(15,2) },
  deliveredKeys: { type: DataTypes.JSON },
}, { tableName: 'order_items', timestamps: true });
