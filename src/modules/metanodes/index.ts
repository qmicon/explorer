export { fetchNodeList, fetchNodeEarningsList } from './utils';

export interface INodeListResponse {
  active: boolean;
  id: string;
  moniker: string;
  rank: number;
  rewardsAddress1: string;
  rewardsAddress2: string;
  shareValid: boolean;
  stake: {
    address: string;
    amount: string;
    stakeTXHash: string;
    stakeTime: number;
    stakeValid: boolean;
  };
  state: number;
  stateName: string;
  thisNode?: boolean;
  version: string;
}

export interface INodesResponse {
  moniker: string;
  stake: {
    address: string;
    amount: string;
    stakeTXHash: string;
    stakeTime: number;
    stakeValid: boolean;
  };
  stateName: string;
  location: string;
  code?: string;
  version: string;
}
export interface INodeEarningsResponse {
  moniker: string;
  bond: number;
  earnings1W: number;
  earnings1M: number;
}

export enum NodeStatus {
  DISCOVERY = 'Discovery',
  SIGNING = 'Signing',
  IDLE = 'Idle',
}
export enum NodeActiveStatus {
  ACTIVE = 'Active',
  NON_ACTIVE = 'nonActive',
}
