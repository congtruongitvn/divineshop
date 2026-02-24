const router = require('express').Router();
const { getMyAffiliate } = require('../controllers/affiliateController');
const { authenticate } = require('../middleware/auth');

router.get('/my', authenticate, getMyAffiliate);

module.exports = router;
