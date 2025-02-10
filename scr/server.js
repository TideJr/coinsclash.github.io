const express = require('express');
const cors = require('cors');
const { Wallet } = require('./ton/wallet');
const { placeBet } = require('./game/bet');

const app = express();
app.use(cors());
app.use(express.json());

// Получение баланса
app.get('/api/balance', async (req, res) => {
  const wallet = new Wallet();
  const balance = await wallet.getBalance();
  res.json({ balance });
});

// Размещение ставки
app.post('/api/bet', async (req, res) => {
  const { choice, amount } = req.body;
  const result = await placeBet(choice, amount);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));