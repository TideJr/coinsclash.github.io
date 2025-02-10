const { Wallet } = require('../ton/wallet');
const { Transactions } = require('../ton/transactions');

async function placeBet(choice, amount) {
  const wallet = new Wallet();
  const transactions = new Transactions();
  const balance = await wallet.getBalance();

  if (balance < amount) {
    return { success: false, message: "Недостаточно средств" };
  }

  // Симуляция подбрасывания монеты
  const coinFlip = Math.random() < 0.5 ? 'Eagle' : 'Reshka';
  const isWinner = coinFlip === choice;

  if (isWinner) {
    const winnings = amount * 2;
    await transactions.sendTON('YOUR_WALLET_ADDRESS', winnings);
    return { success: true, message: `Вы выиграли! ${winnings} TON добавлено на ваш баланс.`, newBalance: balance + winnings };
  } else {
    return { success: true, message: `Вы проиграли! Результат: ${coinFlip}.`, newBalance: balance - amount };
  }
}

module.exports = { placeBet };