const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

TonClient.useBinaryLibrary(libNode);

class Wallet {
  constructor() {
    this.client = new TonClient({ network: { server_address: 'https://ton.org' } });
  }

  async getBalance() {
    const { balance } = await this.client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: 'YOUR_WALLET_ADDRESS' } },
      result: 'balance',
    });
    return balance;
  }

  async sendTransaction(to, amount) {
    const response = await this.client.processing.process_message({
      message_encode_params: {
        address: 'YOUR_WALLET_ADDRESS',
        abi: { type: 'Contract' },
        call_set: { function_name: 'sendTransaction', input: { to, value: amount } },
        signer: { type: 'None' },
      },
    });
    return response;
  }
}

module.exports = { Wallet };