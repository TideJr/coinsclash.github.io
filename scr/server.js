const express = require('express');
const cors = require('cors');
const { Contract } = require('./ton/contracts');

const app = express();
app.use(cors());
app.use(express.json());

const contract = new Contract();

// Получение баланса
app.get('/api/balance', async (req, res) => {
  const { user_id } = req.query;
  const balance = await contract.getBalance(user_id);
  res.json({ balance });
});

// Размещение ставки
app.post('/api/bet', async (req, res) => {
  const { user_id, choice } = req.body;
  const result = await contract.placeBet(user_id, choice);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));