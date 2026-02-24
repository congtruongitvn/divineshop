const router = require('express').Router();
const { getStats, getOrders } = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.use(authenticate, isAdmin);
router.get('/stats', getStats);
router.get('/orders', getOrders);

module.exports = router;
