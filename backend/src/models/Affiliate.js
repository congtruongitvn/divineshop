const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Affiliate', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID },
  code: { type: DataTypes.STRING, unique: true },
  totalEarnings: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  totalOrders: { type: DataTypes.INTEGER, defaultValue: 0 },
  commissionRate: { type: DataTypes.DECIMAL(5,2), defaultValue: 5 },
}, { tableName: 'affiliates', timestamps: true });
