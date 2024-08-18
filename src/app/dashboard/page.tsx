'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// import ParentSize from '@visx/responsive/lib/components/ParentSize'
// import AssetAllocationVisual from './AssetAllocation'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import ResponsiveTable from '../ui/table'
import PerformanceMetrics from './PerformanceMetrics'
import type {PortfolioItem, AllocationItem, BarChartProps } from '../types'

// Lazy load the component
const LazyComponent = dynamic(() => import('./PerformanceMetrics'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

interface LazyComponentProps {
  allocation: any; // Replace `any` with the correct type
}

const LazyLoadOnScroll: React.FC<LazyComponentProps> = ({allocation}) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1, // Adjust as needed
  });

  return <div ref={ref}>{isVisible && <LazyComponent assetsAllocated={allocation}/>}</div>;
};

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [allocation, setAllocation] = useState<AllocationItem[]>([]);
  const [performance, setPerformance] = useState<BarChartProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const portfolioTitles = ['Name', 'Symbol', 'Amount'];
  const assetsAllocationTitles = ['TokenSymbol', 'Allocation']

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch('http://localhost:5000/getWalletTransactions');
        const data = await response.json();
        setPortfolio(data.portfolio);
        setAllocation(data.allocation);
        const performance = data.performance;
        performance.contract = "0x58e6c7ab55Aa9012eAccA16d1ED4c15795669E1C";       
        setPerformance(data.performance);
        // console.log('data portfolio', data.portfolio)
        // console.log('data.allocation', data.allocation)
        // console.log('data.performance', data.performance)
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
      <ResponsiveTable data={portfolio} titles={portfolioTitles}/>

        <h1 className='text-center'>Asset Allocation</h1>
        {/* <LazyComponent assetsAllocated={allocation} width="80%" height={500} /> */}
        <ResponsiveTable data={allocation} titles={assetsAllocationTitles}/>

      {/* Performance Metrics */}
      {/* <div> */}
        <h1>Performance Metrics</h1>
        <PerformanceMetrics data = {performance}/>
        {/* <LazyComponent assetsAllocated={performance} width="80%" height={500} /> */}
      {/* </div> */}
    </div>
  );
}
