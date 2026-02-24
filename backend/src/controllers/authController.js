const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Affiliate } = require('../models');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { email, password, name, referralCode } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });
    const hashed = await bcrypt.hash(password, 12);
    const myCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = await User.create({ email, password: hashed, name, referralCode: myCode, referredBy: referralCode || null });
    await Affiliate.create({ userId: user.id, code: myCode, commissionRate: 5 });
    res.status(201).json({ token: generateToken(user.id), user: { id: user.id, email: user.email, name: user.name, role: user.role, balance: user.balance, referralCode: user.referralCode } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    res.json({ token: generateToken(user.id), user: { id: user.id, email: user.email, name: user.name, role: user.role, balance: user.balance, referralCode: user.referralCode } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.me = async (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email, name: req.user.name, role: req.user.role, balance: req.user.balance, referralCode: req.user.referralCode } });
};
