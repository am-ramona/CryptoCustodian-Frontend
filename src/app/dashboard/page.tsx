'use client'

import { useState, useEffect, useRef } from 'react'
import ResponsiveTable from '../ui/tableList'
import PerformanceMetrics from './PerformanceMetrics'
import type { PortfolioItem, AllocationItem, BarChartProps } from '../types'

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [allocation, setAllocation] = useState<AllocationItem[]>([])
  const [performance, setPerformance] = useState<BarChartProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const portfolioTitles = ['Name', 'Symbol', 'Amount']
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
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio()
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid place-items-center">
      <section className="w-full">
        <h1 className='text-center'>Client Portfolio</h1>
        <ResponsiveTable data={portfolio} titles={portfolioTitles} />
      </section>
      <section className="w-full">
        <h1 className='text-center'>Asset Allocation</h1>
        <ResponsiveTable data={allocation} titles={assetsAllocationTitles} />
      </section>
      <section className="w-full">
        <h1 className='text-center'>Performance Metrics</h1>
        <PerformanceMetrics data={performance} />
      </section>
    </div>
  )
}
