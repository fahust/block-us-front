import axios from "axios";
import { ContractTransactionResponse, ethers } from "ethers";
import { Rules } from "../interface/rules.interface";
import Utils from "../helper/utils";
import { Project } from "../interface/project.interface";

const axiosInstance = axios.create();

export async function createInvest(
  projectId: number,
  value: number,
  utils: Utils,
  tx: bigint | ContractTransactionResponse
): Promise<Project[] | void> {
  try {
    if (utils.accessJwt && typeof tx !== "bigint") {
      const { chainId } = await utils.provider.getNetwork();
      const { data } = await axiosInstance.post(
        `http://localhost:3000/invest/${projectId}`,
        { value, hash: tx.hash, chainId: +chainId.toString() },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            authorization: `Bearer ${utils.accessJwt}`,
          },
        }
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
