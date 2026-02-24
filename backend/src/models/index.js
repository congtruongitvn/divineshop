const sequelize = require('./db');
const { Sequelize } = require('sequelize');

const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const DigitalKey = require('./DigitalKey');
const Affiliate = require('./Affiliate');
const Coupon = require('./Coupon');

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
