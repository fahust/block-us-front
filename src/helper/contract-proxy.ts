import { ethers } from "ethers";
import PST from "../abi/ProxySecurityToken.json";
import { method } from "./method";
import Utils from "./utils";

/**
 * @category SDK
 */
export class ContractProxy {
  utils!: Utils;
  address!: string;

  constructor(utils: Utils, address: string) {
    this.utils = utils;
    this.address = address;
  }

  async mint(
    to: string,
    amount: number,
    value: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    // const amount = 1;
    // const to = await this.utils.signer.getAddress();
    return method(
      "mint",
      this.address,
      [to, amount.toString()],
      PST.abi,
      this.utils,
      value.toString()
    );
  }

  async burn(
    account: string,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "burn",
      this.address,
      [account, amount.toString()],
      PST.abi,
      this.utils,
      amount.toString()
    );
  }

  async refoundable(
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "refoundable",
      this.address,
      [amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async transfer(
    to: string,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "transfer",
      this.address,
      [to, amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async transferFrom(
    from: string,
    to: string,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "transferFrom",
      this.address,
      [from, to, amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async canTransfer(
    operator: string,
    from: string,
    to: string,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "canTransfer",
      this.address,
      [operator, from, to, amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async setRequest(
    message: string,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "setRequest",
      this.address,
      [message, amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async getRequest(): Promise<ethers.ContractTransactionResponse | bigint> {
    return method("getRequest", this.address, [], PST.abi, this.utils);
  }

  async voteToRequest(
    vote: boolean,
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "voteToRequest",
      this.address,
      [vote, amount.toString()],
      PST.abi,
      this.utils
    );
  }

  async withdraw(
    amount: number,
    receiver: string
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "withdraw",
      this.address,
      [amount.toString(), receiver],
      PST.abi,
      this.utils
    );
  }

  async withdrawable(
    amount: number
  ): Promise<ethers.ContractTransactionResponse | bigint> {
    return method(
      "withdrawable",
      this.address,
      [amount.toString()],
      PST.abi,
      this.utils
    );
  }
}
