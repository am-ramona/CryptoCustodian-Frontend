'use client'

import { useEffect, useState } from 'react'
import AssetAllocationVisual from './AssetAllocation'

interface PortfolioItem {
  token: string;
  amount: string;
  date: Date;
}

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [allocation, setAllocation] = useState<PortfolioItem[]>([]);
  const [performance, setPerformance] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setPortfolio(data.portfolio);
        setAllocation(data.allocation);
        setPerformance(data.performance);
        console.log('data portfolio', data.portfolio)
        console.log('data.allocation', data.allocation)
        console.log('data.performance', data.performance)
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 grid place-items-center">
      <h1>Client Portfolio</h1>
      {/* <ul>
        {portfolio.map((item, index) => (
          <li key={index} className="border-b py-2">
            <div className="font-semibold">{item.token}</div>
            <div>Amount: {item.amount}</div>
            <div>Date: {item.date.toDateString()}</div>
            <div>Date: {item.date}</div>
            <div>From: {item.from}</div>
            <div>To: {item.to}</div>
            <div>Transaction Hash: {item.transactionHash}</div>
            <div>Portfolio: {item.portfolioo}</div>
            <div>Portfolio Array: {item.portfolioArray}</div>
          </li>
        ))}
      </ul> */}
      {/* Portfolio Overview */}
      {/* <h2 className="text-xl font-semibold">Portfolio Overview</h2> */}
      <ul aria-label='Client Portfolio menu' className="list-[square] w-full max-h-80 scrollbar-thumb-green scrollbar-gutter-both-edges scrollbar-thin">
        {portfolio.map((item) => (
          <li key={item.symbol} aria-labelledby="Token data" className="font-sans font-normal">
            {item.name}, ({item.symbol}): {item.amount && item.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      {/* Asset Allocation Visualization */}
      <div className="mb-6">
        <h1>Asset Allocation</h1>
        {/* Implement a chart or graph component here */}
        <AssetAllocationVisual />
      </div>

      {/* Performance Metrics */}
      <div>
        <h1>Performance Metrics</h1>
        {/* Implement performance metrics components here */}
      </div>
    </div>
  );
}
