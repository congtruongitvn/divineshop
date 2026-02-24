const { Order } = require('../models');
const { createVnpayUrl, verifyVnpay } = require('../utils/vnpay');
const { deliverOrder } = require('./orderController');

exports.createVnpay = async (req, res) => {
  try {
    const { orderCode, amount } = req.body;
    const url = createVnpayUrl(orderCode, amount, req.ip);
    res.json({ paymentUrl: url });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.vnpayReturn = async (req, res) => {
  try {
    const isValid = verifyVnpay(req.query);
    if (isValid && req.query.vnp_ResponseCode === '00') {
      const order = await Order.findOne({ where: { orderCode: req.query.vnp_TxnRef } });
      if (order && order.paymentStatus === 'pending') {
        await order.update({ paymentStatus: 'paid' });
        await deliverOrder(order.id);
      }
    }
    const status = isValid && req.query.vnp_ResponseCode === '00' ? 'success' : 'failed';
    res.redirect(`${process.env.FRONTEND_URL}/checkout/result?code=${req.query.vnp_TxnRef}&status=${status}`);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.walletPay = async (req, res) => {
  try {
    const { orderCode } = req.body;
    const order = await Order.findOne({ where: { orderCode, userId: req.user.id } });
    if (!order) return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    if (parseFloat(req.user.balance) < parseFloat(order.finalAmount))
      return res.status(400).json({ message: 'Số dư không đủ' });
    await req.user.decrement('balance', { by: parseFloat(order.finalAmount) });
    await order.update({ paymentStatus: 'paid', paymentMethod: 'wallet' });
    await deliverOrder(order.id);
    res.json({ message: 'Thanh toán thành công', order });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
