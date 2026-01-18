export type TBlockchain =
  | 'Osmosis'
  | 'Ethereum'
  | 'Arbitrum'
  | 'Zilliqa'
  | 'Neo';

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: TBlockchain;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
