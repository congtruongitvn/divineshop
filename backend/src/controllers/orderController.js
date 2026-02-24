const { Order, OrderItem, Product, DigitalKey, Coupon } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, couponCode, affiliateCode, email } = req.body;
    const userId = req.user?.id || null;
    const userEmail = email || req.user?.email;
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(400).json({ message: 'Sản phẩm không tồn tại' });
      const price = parseFloat(product.salePrice || product.price);
      totalAmount += price * item.quantity;
      orderItems.push({ productId: product.id, productName: product.name, quantity: item.quantity, price });
    }
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ where: { code: couponCode, isActive: true } });
      if (coupon && coupon.usedCount < coupon.maxUses && totalAmount >= parseFloat(coupon.minOrder)) {
        discountAmount = coupon.type === 'percent' ? totalAmount * parseFloat(coupon.value) / 100 : parseFloat(coupon.value);
        await coupon.increment('usedCount');
      }
    }
    const finalAmount = Math.max(0, totalAmount - discountAmount);
    const orderCode = 'DS' + Date.now();
    const order = await Order.create({ orderCode, userId, email: userEmail, totalAmount, discountAmount, finalAmount, paymentMethod: paymentMethod || 'vnpay', couponCode, affiliateCode });
    for (const item of orderItems) await OrderItem.create({ ...item, orderId: order.id });
    res.status(201).json({ order, orderCode });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, include: [OrderItem], order: [['createdAt','DESC']] });
    res.json({ orders });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ where: { orderCode: req.params.code }, include: [OrderItem] });
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json({ order });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deliverOrder = async (orderId) => {
  const order = await Order.findByPk(orderId, { include: [OrderItem] });
  if (!order) return;
  for (const item of order.OrderItems) {
    const keys = await DigitalKey.findAll({ where: { productId: item.productId, isUsed: false }, limit: item.quantity });
    for (const key of keys) await key.update({ isUsed: true, usedAt: new Date(), orderId });
    await item.update({ deliveredKeys: keys.map(k => k.keyValue) });
  }
  await order.update({ status: 'completed' });
};
