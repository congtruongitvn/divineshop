const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const sequelize = require('./db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  avatar: { type: DataTypes.STRING },
}, { timestamps: true });

module.exports = User;
