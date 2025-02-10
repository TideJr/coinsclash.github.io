const { Wallet } = require('./wallet');

class Transactions {
  constructor() {
    this.wallet = new Wallet();
  }

  async sendTON(to, amount) {
    try {
      const result = await this.wallet.sendTransaction(to, amount);
      return { success: true, transaction: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async receiveTON(from, amount) {
    // Логика получения TON (например, через смарт-контракт)
    return { success: true, message: `Received ${amount} TON from ${from}` };
  }
}

module.exports = { Transactions };