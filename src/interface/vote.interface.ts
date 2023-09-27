export interface Vote {
  id: number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  hash: string;
  value: number;
  validation: boolean;
  chainId: number;
}
