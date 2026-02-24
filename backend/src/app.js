require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Health check TRƯỚC khi connect DB
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/affiliate', require('./routes/affiliate'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

// Start server TRƯỚC, connect DB sau
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  const { sequelize } = require('./models');
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Database connected');
      return sequelize.sync({ alter: false });
    })
    .then(() => console.log('✅ Tables synced'))
    .catch(err => {
      console.error('❌ DB Error:', err.message);
      // KHÔNG exit process - server vẫn chạy
    });
});
