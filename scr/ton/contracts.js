const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

TonClient.useBinaryLibrary(libNode);

class Contract {
  constructor() {
    this.client = new TonClient({ network: { server_address: 'https://ton.org' } });
    this.contractAddress = 'YOUR_CONTRACT_ADDRESS';
  }

  async getBalance(userId) {
    const response = await this.client.net.query_collection({
      collection: 'accounts',
      filter: { id: { eq: this.contractAddress } },
      result: 'balance',
    });
    return response.balance;
  }

  async placeBet(userId, choice) {
    const response = await this.client.processing.process_message({
      message_encode_params: {
        address: this.contractAddress,
        abi: { type: 'Contract' },
        call_set: { function_name: 'placeBet', input: { user_id: userId, choice } },
        signer: { type: 'None' },
      },
    });
    return response;
  }
}

module.exports = { Contract };