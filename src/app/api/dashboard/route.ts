// not used anymore for data fetching. Check the backend

import { NextRequest, NextResponse } from "next/server"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

// Helper function to convert Wei to Ether
const weiToEther = (wei: string): number => parseFloat(wei) / 1e18;
interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string; // In Wei
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

interface SmartContractMetrics {
  transactionCount: number;
  totalGasUsed: number;
  totalEtherTransferred: number;
  tokenTransfers: number;
  minGasUsed: number;
  maxGasUsed: number;
  averageGasPrice: number;
  averageTransactionValue: number;
  // transactionFrequency: Record<string, number>;
  errorRate: number;
}

/**
 * Fetches transaction data from the Etherscan API using the provided contract address and API key.
 *
 * @param {NextRequest} request - The request object containing information about the incoming request.
 * @returns {NextResponse} - The response object containing portfolio, asset allocation, and performance metrics.
 */

export async function GET(request: NextRequest) {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${data.message || response.statusText}`
      );
    }

    const transactions = data.result;

    // Calculate portfolio, asset allocation, and performance metrics
    const portfolio = calculatePortfolio(transactions);
    const allocation = calculateAssetAllocation(transactions);
    const performance = calculatePerformanceMetrics(transactions);

    return NextResponse.json({ portfolio, allocation, performance });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

/**
 * Calculate the total portfolio holdings based on the list of transactions.
 *
 * @param {Object[]} transactions - List of transactions containing token information.
 * @param {string} transactions[].tokenName - The name of the token.
 * @param {string} transactions[].tokenSymbol - The symbol of the token.
 * @param {string} transactions[].value - The value of the transaction.
 * @param {number} transactions[].tokenDecimal - The decimal of the token.
 * @returns {Object[]} An array of token objects representing the portfolio with total amounts.
 */

function calculatePortfolio(transactions: EtherscanTransaction[]) {
  const portfolio = transactions.reduce((acc: Record<string, { amount: number; symbol: string; name?: string }>, tx) => {
    const tokenName = tx.tokenName;
    const token = tx.tokenSymbol;
    const amount = parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal); // Convert from smallest unit

    if (!acc[token]) {
      acc[token] = { amount: 0, symbol: token, name: tokenName };
    }
    acc[token].amount += amount;

    return acc;
  }, {});

  const portfolioArray = Object.values(portfolio);
  return portfolioArray;

  // return transactions.map(tx => ({
  //   token: tx.tokenSymbol,
  //   // amount: tx.value,
  //   amount: parseFloat(tx.value) / (10 ** parseInt(tx.tokenDecimal)), // Convert from smallest unit
  //   date: new Date(tx.timeStamp * 1000), // Convert Unix timestamp to Date
  //   from: tx.from,
  //   to: tx.to,
  //   transactionHash: tx.hash,
  //   portfolioo: portfolio,
  //   portfolioArray: portfolioArray
  // }));

  // const portfolio = transactions.reduce((acc, tx) => {
  //   const token = tx.tokenSymbol;
  //   const amount = parseFloat(tx.value) / (10 ** parseInt(tx.tokenDecimal)); // Convert from smallest unit

  //   if (!acc[token]) {
  //     acc[token] = { amount: 0, symbol: token };
  //   }
  //   acc[token].amount += amount;

  //   return acc;
  // }, {});

  // const portfolioArray = Object.values(portfolio);
  // return portfolioArray;
}

/**
 * Calculates the asset allocation based on a list of transactions.
 * @param transactions An array of transaction objects
 * @returns An object representing the asset allocation
 */

function calculateAssetAllocation(transactions: EtherscanTransaction[]): Array<{ tokenSymbol: string; allocation: number }> {
  const allocation = transactions.reduce((acc: any, tx) => {
    if (!acc[tx.tokenSymbol]) {
      acc[tx.tokenSymbol] = 0;
    }
    acc[tx.tokenSymbol] +=
      parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal);
    return acc;
  }, {});

  // Convert the allocation object to an array of objects
  const allocationArray = Object.keys(allocation).map((tokenSymbol) => ({
    tokenSymbol,
    allocation: allocation[tokenSymbol],
  }));

  return allocationArray
}

const isFailedTransaction = (tx: EtherscanTransaction): boolean => {
  return tx.input === 'deprecated'
};


const calculatePerformanceMetrics = (transactions: EtherscanTransaction[]): SmartContractMetrics => {
  let transactionCount = 0;
  let totalGasUsed = 0;
  let averageGasPrice = 0;
  let maxGasUsed = 0;
  let minGasUsed = 0;
  let totalEtherTransferred = 0;
  let tokenTransfers = 0;
  let averageTransactionValue = 0;
  // let transactionFrequency: Record<string, number> = {};
  let errorRate = 0;

  transactions.forEach(tx => {
    transactionCount++;
    totalGasUsed += parseInt(tx.gasUsed, 10);
    totalEtherTransferred += weiToEther(tx.value);
    // const date = new Date(parseInt(tx.timeStamp, 10) * 1000).toISOString().split('T')[0];
    // transactionFrequency[date] = (transactionFrequency[date] || 0) + 1;
    if (tx.tokenName) {
      tokenTransfers++;
    }
  });

  averageGasPrice = transactions.reduce((sum, tx) => sum + parseInt(tx.gasPrice, 10), 0) / transactions.length;
  averageTransactionValue = transactions.reduce((sum, tx) => sum + parseInt(tx.value, 10), 0) / transactions.length;
  const gasUsedValues = transactions.map(tx => parseInt(tx.gasUsed, 10));
  maxGasUsed = Math.max(...gasUsedValues);
  minGasUsed = Math.min(...gasUsedValues);

  const totalTransactions = transactions.length;
  const failedTransactions = transactions.filter(isFailedTransaction).length;
  errorRate = (failedTransactions / totalTransactions) * 100;

  return {
    transactionCount,
    totalGasUsed,
    totalEtherTransferred,
    tokenTransfers,
    averageGasPrice,
    averageTransactionValue,
    maxGasUsed,
    minGasUsed,
    // transactionFrequency,
    errorRate
  }
}