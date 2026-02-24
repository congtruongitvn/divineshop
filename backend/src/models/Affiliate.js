const { DataTypes } = require('sequelize');

const sequelize = require('./db');

const Affiliate = sequelize.define('Affiliate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  code: { type: DataTypes.STRING, unique: true },
  commission: { type: DataTypes.DECIMAL(5, 2), defaultValue: 10 },
  totalEarned: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

module.exports = Affiliate;
