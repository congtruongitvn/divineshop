const router = require('express').Router();
const { createVnpay, vnpayReturn, walletPay } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

router.post('/vnpay/create', createVnpay);
router.get('/vnpay/return', vnpayReturn);
router.post('/wallet/pay', authenticate, walletPay);

module.exports = router;
