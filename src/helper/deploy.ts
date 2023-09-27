import {
  ethers,
  BytesLike,
  ContractFactory,
  JsonRpcSigner,
  Addressable,
} from "ethers";
import Utils from "./utils";
import SecurityTokenImmutable from "../abi/SecurityTokenImmutable.json";
import ProxySecurityToken from "../abi/ProxySecurityToken.json";
import { Rules } from "../interface/rules.interface";

export async function createContract(
  params: (
    | string
    | Record<string, string | number | boolean>
    | Addressable
    | Rules
  )[],
  contractInterface: ethers.InterfaceAbi,
  bytecode:
    | BytesLike
    | {
        object: string;
      },
  signer: JsonRpcSigner
): Promise<ethers.BaseContract> {
  try {
    const factoryContract = new ContractFactory(
      contractInterface,
      bytecode,
      signer
    );

    const contract = (
      await deployContract(factoryContract, params)
    ).waitForDeployment();
    return contract;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error deploying contract :" + error);
    }
  }
}

export async function deployContract(
  factoryContract: ethers.ContractFactory,
  params: (
    | string
    | Record<string, string | number | boolean>
    | Addressable
    | Rules
  )[]
) {
  return factoryContract.deploy(...params);
}

export async function createTokenContract(
  title: string,
  code: string,
  rules: Rules,
  utils: Utils
): Promise<ethers.BaseContract> {
  await utils.connect();
  const deploymentSecurityToken = await createContract(
    [title, code, rules],
    SecurityTokenImmutable.abi,
    SecurityTokenImmutable.bytecode,
    utils.signer
  );
  if (deploymentSecurityToken instanceof ethers.BaseContract)
    utils.addressContractToken = deploymentSecurityToken.target as string;
  return deploymentSecurityToken;
}

export async function createProxyContract(
  utils: Utils
): Promise<ethers.BaseContract> {
  await utils.connect();
  const deploymentProxyToken = await createContract(
    ["1", utils.addressContractToken],
    ProxySecurityToken.abi,
    ProxySecurityToken.bytecode,
    utils.signer
  );
  if (deploymentProxyToken instanceof ethers.BaseContract)
    utils.addressContractProxy = deploymentProxyToken.target as string;
  return deploymentProxyToken;
}
