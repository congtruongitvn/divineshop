const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const sequelize = require('./db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  originalPrice: { type: DataTypes.DECIMAL(10, 2) },
  image: { type: DataTypes.STRING },
  slug: { type: DataTypes.STRING, unique: true },
  categoryId: { type: DataTypes.INTEGER },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = Product;
