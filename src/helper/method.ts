import Utils from "./utils";
import { call, estimate } from "./estimate-or-call";
import { ethers } from "ethers";

export async function method(
  functionName: string,
  address: string,
  params: (string | boolean | number | object | Uint8Array)[],
  abi: ethers.InterfaceAbi,
  utils: Utils,
  value = "",
  onlyEstimate: boolean = false
): Promise<ethers.ContractTransactionResponse | bigint> {
  try {
    const contract = await utils.contractInstance(abi, address);
    const gasLimit = await estimate(contract, functionName, params, "");
    if (onlyEstimate === true) return gasLimit;
    const tx = await call(
      contract,
      functionName,
      params,
      value,
      gasLimit.toString()
    );
    await utils.waitTx(tx);

    return tx;
  } catch (error) {
    throw error; //await this.errorsBlockchain({ error });
  }
}
