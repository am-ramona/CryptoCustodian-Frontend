'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href='/'>
        Dashboard
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/assetOverview'
      >
        Assets Overview
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/positionsAndHoldings'
      >
        Positions and Holdings
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/aprAndPerformanceMetrics'
      >
        APR and Performance Metrics
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/clientManagement'
      >
        Client Management
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/transactionAndCompliance'
      >
        Transaction and Compliance
      </Link>
    </nav>
  );
}
