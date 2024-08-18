'use client'

import { useState } from 'react'
import Header from './Header'
// import Nav from './Nav_old'
import Footer from './Footer'
import Navigation from './Nav'
import NavigationMobile from './NavMobile'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(false);
	console.log('showSidebar', showSidebar)

	return (
		<>  
		  <Header />
		  <div className="grid grid-cols-1 md:grid-cols-main gap-10">
		  	<NavigationMobile setter={setShowSidebar} />
		  	<Navigation show={showSidebar} setter={setShowSidebar} />
			{/* <Nav /> */}
			<main>{children}</main>
		  </div>
		  <Footer />
		</>
	);
};

export default Layout