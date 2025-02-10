const { Wallet } = require('./wallet');

class Transactions {
  constructor() {
    this.wallet = new Wallet();
  }

  async sendWithCommission(fromUserId, toAddress, amount, commissionRate) {
    const commission = amount * commissionRate;
    const netAmount = amount - commission;

    // Отправка основной суммы
    await this.wallet.sendTransaction(fromUserId, toAddress, netAmount);

    // Отправка комиссии на адрес площадки
    await this.wallet.sendTransaction(fromUserId, process.env.PLATFORM_WALLET_ADDRESS, commission);

    return { success: true, netAmount, commission };
  }
}

module.exports = { Transactions };