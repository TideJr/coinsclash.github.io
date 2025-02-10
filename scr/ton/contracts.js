const { TonClient } = require('@tonclient/core');
const { libNode } = require('@tonclient/lib-node');

TonClient.useBinaryLibrary(libNode);

class Contracts {
  constructor() {
    this.client = new TonClient({ network: { server_address: 'https://ton.org' } });
  }

  async deployContract(contractCode) {
    const response = await this.client.abi.encode_message({
      abi: { type: 'Contract', value: contractCode },
      signer: { type: 'None' },
    });
    return response;
  }

  async callContractMethod(contractAddress, methodName, params) {
    const response = await this.client.processing.process_message({
      message_encode_params: {
        address: contractAddress,
        abi: { type: 'Contract' },
        call_set: { function_name: methodName, input: params },
        signer: { type: 'None' },
      },
    });
    return response;
  }
}

module.exports = { Contracts };