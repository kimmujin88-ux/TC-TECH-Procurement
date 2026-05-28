require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 라우터
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/production-plans', require('./routes/productionPlans'));
app.use('/api/incoming-plans', require('./routes/incomingPlans'));
app.use('/api/purchase-orders', require('./routes/purchaseOrders'));
app.use('/api/state', require('./routes/appState'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
