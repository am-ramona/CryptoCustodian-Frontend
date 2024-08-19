import React from  'react'
import type { NextPage } from 'next'
import Logo from './Logo'

const Header: NextPage = () => {
  return (
    <header className='w-full h-20'>
      <Logo />
    </header>
  );
};

export default Header