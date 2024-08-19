'use client'

import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Navigation from './Nav'
import NavigationMobile from './NavMobile'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

	return (
		<>  
		  <Header />
		  <div className="grid grid-cols-1 min-h-main md:grid-cols-main gap-10">
		  	<NavigationMobile setter={setShowSidebar} />
		  	<Navigation show={showSidebar} setter={setShowSidebar} windowSize={windowSize}  />
			<main className='min-h-main'>{children}</main>
		  </div>
		  <Footer />
		</>
	);
};

export default Layout