import { Project } from "./project.interface";

export interface Invest {
  id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  hash: string;
  value: number;
  validation: boolean;
  chainId: number;
  project?: Project;
}
