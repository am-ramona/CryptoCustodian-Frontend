import React from 'react'
import Link from 'next/link'
import { Menu } from '@carbon/icons-react'

interface NavigationMobileProps {  
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}  

const NavigationMobile: React.FC<NavigationMobileProps> = ({ setter }) => {  
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-blackLight flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                {/* <Image src="/menu.svg" alt="Menu Icon" width={50} height={50} className="text-offWhite"/> */}
                <Menu
                size={32}
                title="Add"
                aria-label="Open Mobile Nav"
                className="text-orange"
                onClick={() => console.log('Icon clicked')}/>
            </button>
            <Link href="/" className="mx-auto text-offWhite">
                Karpatkey
            </Link>
            <Link
                className="text-3xl flex text-white"
                href="/login"
            >
                {/* <FaUser /> */}
            </Link>
        </nav>
    )
}

export default NavigationMobile