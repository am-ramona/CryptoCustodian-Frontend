'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// import ParentSize from '@visx/responsive/lib/components/ParentSize'
import AssetAllocationVisual from './AssetAllocation'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Lazy load the component
const LazyComponent = dynamic(() => import('./AssetAllocation'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

const LazyLoadOnScroll: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1, // Adjust as needed
  });

  return <div ref={ref}>{isVisible && <LazyComponent />}</div>;
};

interface PortfolioItem {
  token: string;
  amount: string;
  date: Date;
}

interface AllocationItem {
  tokenSymbol: string;
  allocation: number;
}

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [allocation, setAllocation] = useState<AllocationItem[]>([]);
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
    <div className="grid place-items-center">
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
      <ul aria-label='Client Portfolio menu' className="list-[square] w-full max-h-80 h-80 overflow-y-auto overflow-x-visible p-5 scrollbar-thumb-green scrollbar-gutter-both-edges scrollbar-thin m-6 space-y-4 border-y border-grey-light">
        {portfolio.map((item) => (
          <li aria-labelledby="Token data" key={item.symbol} className="font-sans font-normal">
            <b>{item.name}, ({item.symbol})</b>: {item.amount && item.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className="w-full">
        <h1 className='text-center'>Asset Allocation</h1>
        <LazyComponent assetsAllocated={allocation} width="80%" height={500} />
      </div>

      {/* Performance Metrics */}
      <div>
        <h1>Performance Metrics</h1>
        {/* Implement performance metrics components here */}
      </div>
    </div>
  );
}
