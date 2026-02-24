const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Coupon', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.ENUM('percent','fixed'), defaultValue: 'percent' },
  value: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  minOrder: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  maxUses: { type: DataTypes.INTEGER, defaultValue: 100 },
  usedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'coupons', timestamps: true });
