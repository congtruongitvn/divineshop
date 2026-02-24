const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const sequelize = require('./db');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  slug: { type: DataTypes.STRING, unique: true },
  image: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

module.exports = Category;
