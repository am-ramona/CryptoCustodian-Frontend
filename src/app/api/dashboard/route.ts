// import type { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// const ETHERSCAN_API_KEY = 'IERRNNKHCYX2E9SDMGANHCCQG9AZYJ9D48';
// const CONTRACT_ADDRESS = '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c';

// export async function GET(request: NextRequest) {
//   try {
//     const response = await axios.get('https://api.etherscan.io/api', {
//       params: {
//         module: 'account',
//         action: 'tokentx',
//         address: CONTRACT_ADDRESS,
//         apikey: ETHERSCAN_API_KEY
//       }
//     });

//     const transactions = response.data.result;

//     // Process transactions to get portfolio, asset allocation, and performance metrics
//     // Example processing (you should adapt it to your needs):
//     const portfolio = transactions.map(tx => ({
//       token: tx.tokenSymbol,
//       amount: tx.value,
//       date: new Date(tx.timeStamp * 1000)
//     }));

//     return NextResponse.json({ portfolio });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.error();
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

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
    const performance = calculatePerformance(transactions);

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

function calculatePortfolio(transactions: any[]) {
  const portfolio = transactions.reduce((acc, tx) => {
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

function calculateAssetAllocation(transactions: any[]): Array<{ tokenSymbol: string; allocation: number }> {
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

  return allocationArray;
}


function calculatePerformance(transactions: any[]) {
  // Example performance calculation based on transaction value
  // You may need more sophisticated calculations based on historical data
  const performance = transactions.reduce((acc: any, tx) => {
    if (!acc[tx.tokenSymbol]) {
      acc[tx.tokenSymbol] = 0;
    }
    acc[tx.tokenSymbol] +=
      parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal);
    return acc;
  }, {});

  return performance;
}

// import axios from 'axios';

// async function getEtherscanData() {
//   const response = await axios.get('https://api.etherscan.io/api', {
//     params: {
//       module: 'account',
//       action: 'tokentx',
//       address: '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c',
//       apikey: 'YourApiKeyToken'
//     }
//   });
//   return response.data.result;
// }

// getEtherscanData().then(console.log).catch(console.error);

// if (data.status === '1') {
//   const transactions = data.result;
//   const tokenSymbols = new Set(transactions.map(tx => tx.tokenSymbol));
//   // return tokenSymbols.size; // Number of distinct tokens
// } else {
//   throw new Error(`Error fetching data: ${data.message}`);
// }

//     const transactions = data.result;
//     const PortfoliosNb = new Set(transactions.map(tx => tx.tokenSymbol)).size;

//     // Process transactions to get portfolio, asset allocation, and performance metrics
//     const portfolio = transactions.map(tx => ({
//       token: tx.tokenSymbol,
//       amount: tx.value,
//       date: new Date(tx.timeStamp * 1000),
//       Portfolios: PortfoliosNb
//     }));

//     return NextResponse.json({ portfolio });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.error();
//   }
// }

// const ETHERSCAN_API_KEY = 'YOUR_ETHERSCAN_API_KEY';
// const CONTRACT_ADDRESS = '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c';

// async function fetchTokenTransactions() {
//   const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;

//   const response = await fetch(url);
//   const data = await response.json();

//   if (data.status === '1') {
//     const transactions = data.result;
//     const tokenSymbols = new Set(transactions.map(tx => tx.tokenSymbol));
//     return tokenSymbols.size; // Number of distinct tokens
//   } else {
//     throw new Error(`Error fetching data: ${data.message}`);
//   }
// }

// fetchTokenTransactions()
//   .then(count => console.log(`Number of distinct client portfolios (tokens): ${count}`))
//   .catch(error => console.error(error));
