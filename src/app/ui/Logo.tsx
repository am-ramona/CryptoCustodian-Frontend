import React from 'react'
import Link from 'next/link'

interface LogoProps {
    color?: string;
    marginAuto?: string;
    [key: string]: string | undefined;
}

const Logo: React.FC<LogoProps> = ({ color = '#232323', marginAuto }) => {
    return (
        <Link href="/" passHref className={`${marginAuto} text-${color}`}>
            <h1 className={`font-mono font-normal text-lg p-6 cursor-pointer`} >
                Crypto Custodian
            </h1>
        </Link>
    );
};

export default Logo