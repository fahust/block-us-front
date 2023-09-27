import { Comment } from "./comment.interface";
import { Invest } from "./invest.interface";
import { News } from "./news.interface";
import { Vote } from "./vote.interface";

export interface Project {
  id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  walletAddressToken: string;
  walletAddressProxy: string;
  hashToken: string;
  hashProxy: string;
  chainId: number;
  title: string;
  description: string;
  shortDescription: string;
  mainCategory: string;
  subCategory: string;
  image: string;
  deployed: boolean;
  pausable: boolean;
  rulesModifiable: boolean;
  voteToWithdraw: boolean;
  dayToWithdraw: number;
  startFundraising: string;
  endFundraising: string;
  maxSupply: number;
  invests?: Invest[];
  votes?: Vote[];
  news?: News[] | number;
  comments?: Comment[] | number;
  likes?: number;
}
