const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' },
  balance: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  referralCode: { type: DataTypes.STRING, unique: true },
  referredBy: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'users', timestamps: true });
