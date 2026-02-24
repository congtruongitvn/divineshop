const router = require('express').Router();
const { createOrder, getMyOrders, getOrder } = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

router.post('/', createOrder);
router.get('/my', authenticate, getMyOrders);
router.get('/:code', getOrder);

module.exports = router;
