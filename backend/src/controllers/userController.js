const { User } = require('../models');
exports.getProfile = async (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email, name: req.user.name, balance: req.user.balance, referralCode: req.user.referralCode, role: req.user.role } });
};
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    await req.user.update({ name });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
