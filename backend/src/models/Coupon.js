const { DataTypes } = require('sequelize');

const sequelize = require('./db');

const Coupon = sequelize.define('Coupon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  discountType: { type: DataTypes.ENUM('percent','fixed'), defaultValue: 'percent' },
  discountValue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  minOrder: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  maxUses: { type: DataTypes.INTEGER },
  usedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  expiresAt: { type: DataTypes.DATE },
}, { timestamps: true });

module.exports = Coupon;
