import { Contract, ContractTransactionResponse } from "ethers";

export const estimate = async (
  contract: Contract,
  functionName: string,
  args: Array<string | number | boolean | object | Uint8Array>,
  value: string
): Promise<bigint> => {
  let arg: Array<string | number | boolean | object | Uint8Array> = [...args];
  if (value !== "" && value && args && args.length) {
    arg.push({ value });
  } else if (value !== "" && value) {
    arg = [{ value }];
  } else if (args && args.length) {
    arg = args;
  }
  return contract[functionName].estimateGas(...arg);
};

export const call = async (
  contract: Contract,
  functionName: string,
  args: Array<string | number | boolean | object | Uint8Array>,
  value: string,
  gasLimit: string
): Promise<ContractTransactionResponse> => {
  let arg: Array<string | number | boolean | object | Uint8Array> = [...args];
  if (value !== "" && value && args && args.length) {
    if (gasLimit !== "0") {
      arg?.push({ value, gasLimit });
    } else {
      arg?.push({ value });
    }
  } else if (value !== "" && value) {
    if (gasLimit !== "0") {
      arg = [{ value, gasLimit }];
    } else {
      arg = [{ value }];
    }
  } else if (args && args.length) {
    if (gasLimit !== "0") {
      arg?.push({ gasLimit });
    }
  }
  return contract[functionName](...arg);
};
