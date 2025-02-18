import { PoolMode } from '../pool';
import { IFee, ITransactions, TTxRawObject } from '../explorer';

export type Volume = { at: string; amount: string };

export type NetworkStats = {
  volume1wksWBTC: number;
  volume1wksBTC: number;
  volume1wksWBTC_Skypool: number;
  volumes: Volume[];
  rewards1wksUSD: number;
  metanodes: number;
};

export type NetworkInfo = {
  capacity: number;
  floatBalances: {
    btcEth: number;
    wbtc: number;
    btcSkypool: number;
    wbtcSkypool: number;
  };
  stats: NetworkStats;
};

export type USDPrices = {
  BTC: number;
  SWINGBY: number;
};

export type NodeEndpoint = {
  btc_erc: string;
  btc_bep20: string;
};

export type PoolRecentTx = {
  data: unknown;
  total: number;
} | null;

export type PoolState = {
  mode: PoolMode;
  recentTxs: PoolRecentTx;
  minimumWithdrawAmount: number | null;
};

export type ThemeType = 'light' | 'dark' | 'auto';

export type ExplorerState = {
  isLoading: boolean;
  usd: USDPrices;
  networkInfos: NetworkInfo;
  transactionFees: IFee[];
  isExistPreviousPage: boolean;
  swapHistory: ITransactions | null;
  swapHistoryTemp: TTxRawObject[] | null;
};

export type SettingsState = {
  theme: ThemeType;
};
