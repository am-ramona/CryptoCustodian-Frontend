'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import type { NextPage } from 'next'

const Nav: NextPage = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
      <li><Link className={`font-sans font-semibold size-4 ${pathname === '/' ? 'active' : ''}`} href='/'>
        Dashboard
      </Link>
      </li>

      <li><Link
        className={`font-sans font-semibold size-4 ${pathname === '/about' ? 'active' : ''}`}
        href='/assetOverview'
      >
        Assets Overview
      </Link>
      </li>

      <li>
      <Link
        className={`font-sans font-semibold size-4 ${pathname === '/about' ? 'active' : ''}`}
        href='/positionsAndHoldings'
      >
        Positions and Holdings
      </Link>
      </li>

<li>
      <Link
        className={`font-sans font-semibold size-4 ${pathname === '/about' ? 'active' : ''}`}
        href='/aprAndPerformanceMetrics'
      >
        APR and Performance Metrics
      </Link></li>

    <li>  <Link
        className={`font-sans font-semibold size-4 ${pathname === '/about' ? 'active' : ''}`}
        href='/clientManagement'
      >
        Client Management
      </Link>
      </li>

     <li> <Link
        className={`font-sans font-semibold size-4 ${pathname === '/about' ? 'active' : ''}`}
        href='/transactionAndCompliance'
      >
        Transaction and Compliance
      </Link>
      </li>
      </ul>
    </nav>
  );
}

export default Nav
