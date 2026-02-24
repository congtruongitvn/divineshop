const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME || 'divineshop',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  { host: process.env.DB_HOST || 'localhost', port: process.env.DB_PORT || 5432,
    dialect: 'postgres', logging: false }
);
const User = require('./User')(sequelize);
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);
const DigitalKey = require('./DigitalKey')(sequelize);
const Affiliate = require('./Affiliate')(sequelize);
const Coupon = require('./Coupon')(sequelize);

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

module.exports = { sequelize, User, Category, Product, Order, OrderItem, DigitalKey, Affiliate, Coupon };
