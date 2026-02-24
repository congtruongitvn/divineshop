const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

// Import models — không gọi như function
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const DigitalKey = require('./DigitalKey');
const Affiliate = require('./Affiliate');
const Coupon = require('./Coupon');
const sequelize = require('./db');

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(DigitalKey, { foreignKey: 'productId' });
DigitalKey.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { sequelize, Sequelize, User, Category, Product, Order, OrderItem, DigitalKey, Affiliate, Coupon };
