const router = require('express').Router();
const { Category } = require('../models');
const slugify = require('slugify');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name','ASC']] });
    res.json({ categories });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { name, icon } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const category = await Category.create({ name, slug, icon });
    res.status(201).json({ category });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
