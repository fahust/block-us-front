import { Comment } from "./comment.interface";
import { Invest } from "./invest.interface";
import { Project } from "./project.interface";
import { Vote } from "./vote.interface";

export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  walletAddress: string;
  name: string;
  image: string;
  password: null;
  email: string;
  lastName: string;
  projects?: Project[];
  invests?: Invest[];
  votes?: Vote[];
  comments?: Comment[];
}
