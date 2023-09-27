import STI from "../abi/SecurityTokenImmutable.json";
import { Addressable, ethers } from "ethers";
import { method } from "./method";
import Utils from "./utils";

/**
 * @category SDK
 */
export class ContractToken {
  utils!: Utils;
  address!: string;

  constructor(utils: Utils, address: string) {
    this.utils = utils;
    this.address = address;
  }

  async addProxyToContract(
    proxyAddress: string
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "setAddressProxy",
      this.address,
      [proxyAddress],
      STI.abi,
      this.utils
    );
  }

  async getAddressProxy(): Promise<
    ethers.ContractTransactionResponse | bigint
  > {
    return method("getAddressProxy", this.address, [], STI.abi, this.utils);
  }

  async setFundraising(
    startFundraising: number,
    endFundraising: number,
    maxSupply = 0
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "setFundraising",
      this.address,
      [
        startFundraising.toString(),
        endFundraising.toString(),
        maxSupply.toString(),
      ],
      STI.abi,
      this.utils
    );
  }

  async setRules(
    rules: Record<string, string | boolean | number>
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("setRules", this.address, [rules], STI.abi, this.utils);
  }

  async getRules(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("getRules", this.address, [], STI.abi, this.utils);
  }

  async owner(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("owner", this.address, [], STI.abi, this.utils);
  }

  async transfers(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("transfers", this.address, [], STI.abi, this.utils);
  }

  async transferOwnership(
    newOwner: Addressable
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "transferOwnership",
      this.address,
      [newOwner],
      STI.abi,
      this.utils
    );
  }

  async totalSupply(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("totalSupply", this.address, [], STI.abi, this.utils);
  }

  async balanceOf(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("balanceOf", this.address, [], STI.abi, this.utils);
  }

  async pause(
    untilTimestamp: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "pause",
      this.address,
      [untilTimestamp.toString()],
      STI.abi,
      this.utils
    );
  }

  async unpause(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("unpause", this.address, [], STI.abi, this.utils);
  }

  async isPaused(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("isPaused", this.address, [], STI.abi, this.utils);
  }

  async handlePayment(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "handlePayment",
      this.address,
      [await this.utils.signer.getAddress()],
      STI.abi,
      this.utils
    );
  }

  async injectCapital(
    value: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "injectCapital",
      this.address,
      [],
      STI.abi,
      this.utils,
      value.toString()
    );
  }
}
