import { ethers, formatEther, JsonRpcSigner } from "ethers";
import axios, { AxiosInstance } from "axios";
import { ChainId, ChainIdHexa } from "../enum/network.enum";
import { User } from "../interface/user.interface";

export enum CurrencyEnum {
  ETH = "ETH",
  MATIC = "MATIC",
}

export enum MoneyEnum {
  BTC = "BTC",
  USD = "USD",
  EUR = "EUR",
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

const gwei = 1000000000;
const eth = 1000000000000000000;

/**
 * @category SDK
 */
class Utils {
  provider!: ethers.BrowserProvider;
  signer!: JsonRpcSigner;
  addressContractToken!: string;
  addressContractProxy!: string;
  contract!: ethers.Contract;
  contractLogger!: ethers.Contract;
  challenge!: string;
  signature!: string;
  accessJwt!: string;
  refreshJwt!: string;
  user!: User;

  walletWithProvider!: ethers.Wallet;
  //JWT!: string;

  connectedWeb3 = false;
  testing = false;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  /**
   * Create an instance of contract with them you want interact
   * @param {ICollection} collection
   * @returns {ethers.Contract} contract instance
   */
  async contractInstance(
    abi: ethers.InterfaceAbi,
    address: string
  ): Promise<ethers.Contract> {
    await this.connect();
    return new ethers.Contract(address, abi, this.signer);
  }

  async connect(): Promise<void> {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
  }

  async sign(challenge: string): Promise<string> {
    return this.signer.signMessage(challenge);
  }

  async switchNetwork(chainId: ChainIdHexa): Promise<void> {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  }

  async requestChallenge(): Promise<string> {
    const { data } = await this.axiosInstance.post(
      `http://localhost:3000/authentication/challenge`,
      { walletAddress: this.signer.address },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    this.challenge = data.challenge;
    return this.challenge;
  }

  async authenticate(signature: string): Promise<string> {
    const { data } = await this.axiosInstance.post(
      `http://localhost:3000/authentication`,
      { walletAddress: this.signer.address, signature },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    this.accessJwt = data.accessJwt;
    this.refreshJwt = data.refreshJwt;
    this.challenge = "";
    return this.accessJwt;
  }

  async authentication(): Promise<string | void> {
    await this.connect();
    if (!this.challenge?.length) {
      const challenge = await this.requestChallenge();
      const sign = await this.sign(challenge);
      return this.authenticate(sign);
    }
  }

  /**
   * Return signed public address of current wallet
   * @returns {string} address wallet
   * @category UTILS
   */
  async getMySignedAddress(): Promise<string> {
    if (this.connectedWeb3) {
      return await this.signer.getAddress();
    } else if (this.testing === true) {
      return "0x0cE1A376d6CC69a6F74f27E7B1D65171fcB69C80";
    } else {
      return "Not connected to web3";
    }
  }

  /**
   * Hexadecimal to ascii string
   * @param str1
   * @returns return ascii
   * @category UTILS
   */
  async hexToAscii(str1: any): Promise<string> {
    const hex = str1.toString();
    let str = "";
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  // /**
  //  * Util to decode Blockchain custom error
  //  * @param error
  //  * @returns
  //  * @category UTILS
  //  */
  // async errorsBlockchain(error: any) {
  //   const abiFunction = [
  //     'function NotInWhitelist(bool validMerkleProof)',
  //     'function ProofClaimed(uint256 conditionId, uint256 merkleProofIndex, bool limitMerkleProofClaim)',
  //     'function InvalidQuantityProof(uint256 proofMaxQuantityPerTransaction, uint256 quantity)',
  //     'function InvalidQuantityClaimed(uint256 quantity, bool verifyMaxQuantityPerTransaction, uint256 quantityLimitPerTransaction)',
  //     'function InvalidPriceOrCurrency(address currency, address phaseCurrency, uint256 pricePerToken, uint256 phasePricePerToken)',
  //     'function ExceedMaxMintSupply(uint256 quantity, uint256 supplyClaimed, uint256 maxClaimableSupply)',
  //     'function NotEnoughMintedTokens(uint256 quantity, uint256 nextTokenIdToClaim, uint256 nextTokenIdToMint)',
  //     'function ExceedMaxTotalSupply(uint256 quantity, uint256 maxTotalSupply, uint256 nextTokenIdToClaim)',
  //     'function ExceedClaimLimitForWallet(uint256 quantity, uint256 walletClaimCountClaimer, address claimer, uint256 maxWalletClaimCount)',
  //     'function CannotClaimYet(uint256 lastClaimTimestamp, uint256 blockTimestamp, uint256 nextValidClaimTimestamp)',
  //     'function NothingToReveal(uint256 encryptedURILength)',
  //     'function InvalidIndex(uint256 index, uint256 baseURIIndicesLength)',
  //     'function StartTimeStamp(uint256 index, uint256 lastConditionStartTimestamp, uint256 startTimestamp)',
  //     'function MaxSupply(uint256 index, uint256 supplyClaimedAlready, uint256 maxClaimableSupply)',
  //     'function PriceNotGood(uint256 value, uint256 totalPrice)',
  //     'function MaxTotalySupply(uint256 maxTotalSupply, uint256 nextTokenIdToMint)',
  //     'function Paused(bool paused, address owner, address ownerOfToken, uint256 startTokenId)',
  //     'function UpMaxMint(uint256 countTotal, uint256 quantity, uint256 maxSupply)',
  //     'function TokenAlreadyMinted(uint256 idToken)',
  //     'function NotSentByAllowedMinters(bool allowed, address sender)',
  //     'function LazyMintMustBeOneOrTwo(uint8 currentLazyMint, uint8 newLazyMint)',
  //     'function ContractNotSettedLazy(uint8 lazyMint)',
  //     'function UpMaxQuantity(uint256 currentQuantity, uint256 newQuantity, uint256 maxEdition)',
  //     'function ERC721RequiredBalance(address erc721Required, address claimer)',
  //     'function ERC1155RequiredBalance(address erc721Required, uint256 erc721IdRequired, address claimer)',
  //     'function AmountNotAllowed(uint256 cardIdToRedeem, uint256 balance, uint256 quantityBeingClaimed, address sender)',
  //   ];
  //   const abiType = [
  //     'NotInWhitelist(bool)',
  //     'ProofClaimed(uint256,uint256,bool)',
  //     'InvalidQuantityProof(uint256,uint256)',
  //     'InvalidQuantityClaimed(uint256,bool,uint256)',
  //     'InvalidPriceOrCurrency(address,address,uint256,uint256)',
  //     'ExceedMaxMintSupply(uint256,uint256,uint256)',
  //     'NotEnoughMintedTokens(uint256,uint256,uint256)',
  //     'ExceedMaxTotalSupply(uint256,uint256,uint256)',
  //     'ExceedClaimLimitForWallet(uint256,uint256,address,uint256)',
  //     'CannotClaimYet(uint256,uint256,uint256)',
  //     'NothingToReveal(uint256)',
  //     'InvalidIndex(uint256,uint256)',
  //     'StartTimeStamp(uint256,uint256,uint256)',
  //     'MaxSupply(uint256,uint256,uint256)',
  //     'PriceNotGood(uint256,uint256)',
  //     'MaxTotalySupply(uint256,uint256)',
  //     'Paused(bool,address,address,uint256)',
  //     'UpMaxMint(uint256,uint256,uint256)',
  //     'TokenAlreadyMinted(uint256)',
  //     'NotSentByAllowedMinters(bool,address)',
  //     'LazyMintMustBeOneOrTwo(uint8,uint8)',
  //     'ContractNotSettedLazy(uint8)',
  //     'UpMaxQuantity(uint256,uint256,uint256)',
  //     'ERC721RequiredBalance(address,address)',
  //     'ERC1155RequiredBalance(address,uint256,address)',
  //     'AmountNotAllowed(uint256,uint256,uint256,address)',
  //   ];
  //   const interfaceEthers = new Interface(abiFunction);

  //   let decoded;
  //   let errorFunction;
  //   let lastError;
  //   abiFunction.forEach((a, key) => {
  //     try {
  //       const tempDecoded = interfaceEthers.decodeFunctionData(
  //         interfaceEthers.functions[abiType[key]],
  //         error.data.originalError.data
  //       );
  //       decoded = tempDecoded;
  //       errorFunction = abiType[key];
  //     } catch (error) {
  //       lastError = error;
  //     }
  //   });
  //   return {
  //     errorFunction: errorFunction ? errorFunction : error,
  //     decoded,
  //     lastError,
  //   };
  // }

  /**
   * return native token of user or smart contract
   * @param {string} addressWallet address you want check balance
   * @returns
   * @category UTILS
   */
  async getBalance(addressWallet: string): Promise<string> {
    const balance = await this.provider.getBalance(addressWallet);
    return formatEther(balance);
  }

  /**
   * return balance of erc for an address wallet user or smart contract
   * @param {ICollection} collection Interface Collection with which you can interact
   * @param {string} addressWallet address you want check balance
   * @param {number} tokenId optional token id for Phoenix and DropErc1155 contract
   * @returns
   * @category UTILS
   */
  // async balanceOf(
  //   collection: ICollection,
  //   addressWallet: string,
  //   tokenId: number
  // ) {
  //   const instanceConctract = await this.contractInstance(collection);
  //   if (
  //     collection?.contract?.type === 'DROPPHOENIX' ||
  //     collection?.contract?.type === 'DROPERC1155' ||
  //     collection?.contract?.type === 'CLASSICERC1155'
  //   ) {
  //     return ethers.utils.formatEther(
  //       await instanceConctract.balanceOf(addressWallet, tokenId)
  //     );
  //   } else {
  //     return ethers.utils.formatEther(
  //       await instanceConctract.balanceOf(addressWallet)
  //     );
  //   }
  // }

  /**
   *
   * @param {CurrencyEnum} currency
   * @param {number} value
   * @param {MoneyEnum} money
   * @returns {number}
   */
  async convertCurrency(
    currency: CurrencyEnum,
    value: number,
    money: MoneyEnum
  ): Promise<number> {
    const result = await this.axiosInstance.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,MATIC&tsyms=BTC,USD,EUR&api_key=2521c1912b7c41a0419a28a31bf726517d1e4cd078e3c8fb882aedb7af6d4c5a`
    );
    return result.data[currency][money] * value;
  }

  async waitTx(tx: any): Promise<void> {
    await tx.wait();
  }

  scanAddressByNetwork(network: ChainId) {
    if (network === ChainId.ETHEREUMGOERLI)
      return "https://goerli.etherscan.io/address/";
    if (network === ChainId.ETHEREUMMAINNET)
      return "https://etherscan.io/address/";
    if (network === ChainId.POLYGONMAINNET)
      return "https://polygonscan.com/address/";
    if (network === ChainId.POLYGONMUMBAI)
      return "https://mumbai.polygonscan.com/address/";
  }

  scanTxByNetwork(network: ChainId) {
    if (network === ChainId.ETHEREUMGOERLI)
      return "https://goerli.etherscan.io/tx/";
    if (network === ChainId.ETHEREUMMAINNET) return "https://etherscan.io/tx/";
    if (network === ChainId.POLYGONMAINNET)
      return "https://polygonscan.com/tx/";
    if (network === ChainId.POLYGONMUMBAI)
      return "https://mumbai.polygonscan.com/tx/";
  }

  convertValue(value: number) {
    if (value > eth) return Math.floor(value / eth);
    if (value > gwei) return Math.floor(value / gwei);
    return value;
  }

  convertSymbol(value: number) {
    if (value > eth) return "Eth";
    if (value > gwei) return "Gwei";
    return "Wei";
  }
}

export default Utils;
