const router = require('express').Router();
const { getProducts, getProduct, createProduct, addKeys } = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:slug', getProduct);
router.post('/', authenticate, isAdmin, createProduct);
router.post('/:id/keys', authenticate, isAdmin, addKeys);

module.exports = router;
