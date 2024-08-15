import type { NextPage } from 'next'
import Link from 'next/link'

const Header: NextPage = () => {
  return (
    <header className='w-full h-20'>
      <Link href="/">
        <h1 className="font-mono font-normal text-lg p-6 cursor-pointer">Crypto Custodian</h1>
      </Link>
    </header>
  );
};

export default Header