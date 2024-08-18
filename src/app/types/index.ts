export interface PortfolioItem {
  [key:string]: string | number | Date;
  name: string;
  symbol: string;
  token: string;
  amount: string | number;
  date: Date | string;
}

export interface AllocationItem {
  tokenSymbol: string;
  allocation: number;
}

export interface BarChartProps {
  transactionCount: number,
  totalGasUsed: number,
  totalEtherTransferred: number,
  tokenTransfers: number,
  averageGasPrice: number,
  averageTransactionValue: number,
  maxGasUsed: number,
  minGasUsed: number,
  errorRate: number,
  contract: string,
  [key: string]: string | number
}
