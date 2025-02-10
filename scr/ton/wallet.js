const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

TonClient.useBinaryLibrary(libNode);

class Wallet {
  constructor() {
    this.client = new TonClient({ network: { server_address: process.env.TON_NETWORK } });
  }

  async getBalance(userId) {
    const response = await this.client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: userId } },
      result: 'balance',
    });
    return response.balance;
  }

  async sendTransaction(fromUserId, toAddress, amount) {
    const response = await this.client.processing.process_message({
      message_encode_params: {
        address: fromUserId,
        abi: { type: 'Contract' },
        call_set: { function_name: 'sendTransaction', input: { to: toAddress, value: amount } },
        signer: { type: 'None' },
      },
    });
    return response;
  }
}

module.exports = { Wallet };