const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Order', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  orderCode: { type: DataTypes.STRING, unique: true },
  userId: { type: DataTypes.UUID },
  email: { type: DataTypes.STRING },
  totalAmount: { type: DataTypes.DECIMAL(15,2) },
  finalAmount: { type: DataTypes.DECIMAL(15,2) },
  paymentMethod: { type: DataTypes.ENUM('vnpay','momo','wallet'), defaultValue: 'vnpay' },
  paymentStatus: { type: DataTypes.ENUM('pending','paid','failed'), defaultValue: 'pending' },
  status: { type: DataTypes.ENUM('pending','processing','completed','cancelled'), defaultValue: 'pending' },
  couponCode: { type: DataTypes.STRING },
  affiliateCode: { type: DataTypes.STRING },
}, { tableName: 'orders', timestamps: true });
