import React from 'react'
import Logo from './Logo'
import { Menu } from '@carbon/icons-react'
interface NavigationMobileProps {
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({ setter }) => {
    return (
        <nav className="md:hidden z-40 fixed top-0 left-0 right-0 h-[80px] bg-blackLight text-offWhite flex [&>*]:my-auto px-2">
            <button
                onClick={() => {
                    setter(oldVal => !oldVal)
                }}
            >
                <Menu
                    size={32}
                    title="Add"
                    aria-label="Open Mobile Nav"
                    className="text-green"
                />
            </button>
            <Logo color="offWhite" marginAuto="mx-auto" />
        </nav>
    )
}

export default NavigationMobile