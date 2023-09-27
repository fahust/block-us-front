import axios from "axios";
import { ethers } from "ethers";
import { Rules } from "../interface/rules.interface";
import Utils from "../helper/utils";
import { Project } from "../interface/project.interface";

const axiosInstance = axios.create();

export async function createProject(
  title: string,
  description: string,
  mainCategory: string,
  subCategory: string,
  deploymentSecurityToken: ethers.BaseContract,
  deploymentProxy: ethers.BaseContract,
  jwtToken: string,
  network: ethers.Network,
  rules: Rules,
  utils: Utils
): Promise<Project | void> {
  const hashToken = deploymentSecurityToken.deploymentTransaction()?.hash;
  const hashProxy = deploymentProxy.deploymentTransaction()?.hash;

  const startFundraising = new Date(rules.startFundraising * 1000);
  const endFundraising = new Date(rules.endFundraising * 1000);

  if (utils.accessJwt) {
    const { data } = await axiosInstance.post(
      `http://localhost:3000/project`,
      {
        title,
        description,
        mainCategory,
        subCategory,
        deploy: false,
        walletAddressToken: deploymentSecurityToken.target,
        hashToken,
        walletAddressProxy: deploymentProxy.target,
        hashProxy,
        chainId: network.chainId.toString(),
        ...rules,
        startFundraising,
        endFundraising,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return data;
  }
}

export async function getProjectByCategory(
  category: string,
  utils: Utils
): Promise<Project[] | void> {
  if (utils.accessJwt) {
    const { data } = await axiosInstance.get(
      `http://localhost:3000/project/category/${category}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${utils.accessJwt}`,
        },
      }
    );
    return data;
  }
}

export async function getProject(
  projectId: string,
  utils: Utils
): Promise<Project | void> {
  if (utils.accessJwt) {
    const { data } = await axiosInstance.get(
      `http://localhost:3000/project/${projectId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${utils.accessJwt}`,
        },
      }
    );
    return data;
  }
}
