const { User, Product, Order } = require('../models');
const { sequelize } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const result = await Order.findOne({ where: { paymentStatus: 'paid' }, attributes: [[sequelize.fn('SUM', sequelize.col('finalAmount')), 'total']] });
    res.json({ stats: { totalUsers, totalProducts, totalOrders, totalRevenue: parseFloat(result?.dataValues?.total || 0) } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [{ model: User, attributes: ['email','name'] }], order: [['createdAt','DESC']] });
    res.json({ orders });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
