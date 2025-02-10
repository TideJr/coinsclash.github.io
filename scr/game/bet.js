const { Wallet } = require('../ton/wallet');
const { Transactions } = require('../ton/transactions');

class Bet {
  constructor() {
    this.wallet = new Wallet();
    this.transactions = new Transactions();
  }

  async placeBet(user1Id, user1Choice, user2Id, user2Choice, betAmount) {
    const user1Balance = await this.wallet.getBalance(user1Id);
    const user2Balance = await this.wallet.getBalance(user2Id);

    if (user1Balance < betAmount || user2Balance < betAmount) {
      return { success: false, message: "Недостаточно средств" };
    }

    // Списываем ставки
    await this.wallet.sendTransaction(user1Id, process.env.CONTRACT_ADDRESS, betAmount);
    await this.wallet.sendTransaction(user2Id, process.env.CONTRACT_ADDRESS, betAmount);

    // Определяем результат
    if (user1Choice === user2Choice) {
      // Если выборы одинаковые, возвращаем средства с комиссией 0.5%
      const returnAmount = betAmount * 0.995; // 0.5% комиссии
      await this.transactions.sendWithCommission(process.env.CONTRACT_ADDRESS, user1Id, returnAmount, 0);
      await this.transactions.sendWithCommission(process.env.CONTRACT_ADDRESS, user2Id, returnAmount, 0);
      return { success: true, message: "Ничья! Средства возвращены с комиссией 0.5%." };
    } else {
      // Если выборы разные, определяем победителя
      const result = Math.random() < 0.5 ? user1Choice : user2Choice;
      const winnerId = result === user1Choice ? user1Id : user2Id;

      // Выигрыш: удвоение ставки за вычетом комиссии 10%
      const winnings = betAmount * 2;
      await this.transactions.sendWithCommission(process.env.CONTRACT_ADDRESS, winnerId, winnings, 0.1);
      return { success: true, message: `Победитель: ${winnerId === user1Id ? "Игрок 1" : "Игрок 2"}!` };
    }
  }
}

module.exports = { Bet };