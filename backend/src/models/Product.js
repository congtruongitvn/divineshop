const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Product', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(15,2), allowNull: false },
  salePrice: { type: DataTypes.DECIMAL(15,2) },
  image: { type: DataTypes.STRING },
  categoryId: { type: DataTypes.UUID },
  deliveryType: { type: DataTypes.ENUM('auto','manual'), defaultValue: 'auto' },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  sold: { type: DataTypes.INTEGER, defaultValue: 0 },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'products', timestamps: true });
