const { Affiliate } = require('../models');
exports.getMyAffiliate = async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ where: { userId: req.user.id } });
    if (!affiliate) return res.status(404).json({ message: 'Chưa có tài khoản affiliate' });
    res.json({ affiliate });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
