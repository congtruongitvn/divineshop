const { Product, Category, DigitalKey } = require('../models');
const slugify = require('slugify');
const { Op } = require('sequelize');

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, featured, sort } = req.query;
    const where = { isActive: true };
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (featured === 'true') where.isFeatured = true;
    const order = sort === 'price_asc' ? [['price','ASC']] : sort === 'price_desc' ? [['price','DESC']] : [['createdAt','DESC']];
    const { rows: products, count } = await Product.findAndCountAll({ where, order, limit: +limit, offset: (+page-1) * +limit, include: [{ model: Category, attributes: ['id','name','slug'] }] });
    res.json({ products, total: count, pages: Math.ceil(count / +limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { slug: req.params.slug, isActive: true }, include: [Category] });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    const stock = await DigitalKey.count({ where: { productId: product.id, isUsed: false } });
    res.json({ product: { ...product.toJSON(), stock } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, salePrice, description, image, categoryId, deliveryType, isFeatured } = req.body;
    const slug = slugify(name, { lower: true, strict: true }) + '-' + Date.now();
    const product = await Product.create({ name, slug, price, salePrice, description, image, categoryId, deliveryType, isFeatured });
    res.status(201).json({ product });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addKeys = async (req, res) => {
  try {
    const { keys } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    const created = await DigitalKey.bulkCreate(keys.map(k => ({ productId: product.id, keyValue: k.trim() })));
    res.json({ message: `Đã thêm ${created.length} keys` });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
