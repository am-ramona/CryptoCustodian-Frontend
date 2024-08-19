'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Workspace, Dashboard, Row, DataVis_1, CustomerService, IbmOpenshiftContainerPlatformOnVpcForRegulatedIndustries } from '@carbon/icons-react'

type SidebarProps = {
    show: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    windowSize?: {
        width: number;
        height: number;
    }
};

type MenuItemProps = {
    icon: React.ReactNode;
    name: string;
    route: string;
    [key: string]: any;
};

const Navigation: React.FC<SidebarProps> = ({ show, setter, windowSize }) => {
    const [bgColor, setBgColor] = useState<string>('bg-offWhite');
    const [textColor, setTextColor] = useState<string>('text-blackLight/75');
  
    const pathname = usePathname();
  
    const className =
      'w-fit h-full transition-[margin-left] ease-in-out duration-500 fixed md:static top-[80px] bottom-0 left-0 z-40';
    const appendClass = show
      ? 'ml-0 h-full'
      : 'ml-[-320px] md:ml-0 h-[calc(100vh-10rem)]';
  
    useEffect(() => {
      const updateColors = () => {
        if (window.innerWidth < 768) {
          if (!show) {
            const timer = setTimeout(() => {
              setBgColor('bg-offWhite');
              setTextColor('text-blackLight/75');
            }, 500000);
            return () => clearTimeout(timer);
          } else {
            setBgColor('bg-blackLight');
            setTextColor('text-offWhite/75');
          }
        } else {
          setBgColor('bg-offWhite');
          setTextColor('text-blackLight/75');
        }
      };
  
      updateColors();
    }, [show, windowSize]);
  
    const menuItems = [
      { name: 'Dashboard', route: '/', icon: <Workspace /> },
      { name: 'Assets Overview', route: '/assetOverview', icon: <Dashboard /> },
      { name: 'Positions and Holdings', route: '/positionsAndHoldings', icon: <Row /> },
      { name: 'APR and Performance Metrics', route: '/aprAndPerformanceMetrics', icon: <DataVis_1 /> },
      { name: 'Client Management', route: '/clientManagement', icon: <CustomerService /> },
      { name: 'Transaction and Compliance', route: '/transactionAndCompliance', icon: <IbmOpenshiftContainerPlatformOnVpcForRegulatedIndustries /> }
    ];
  
    const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route }) => {
      const colorClass = pathname === route ? 'text-inherit' : 'text-inherit/75 hover:text-inherit';
  
      return (
        <Link
          href={route}
          onClick={() => setter(prev => !prev)}
          className={`flex gap-2 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
        >
          <div className="text-xl flex [&>*]:mx-auto text-green">{icon}</div>
          <div className="font-mono font-normal">{name}</div>
        </Link>
      );
    };
  
    const ModalOverlay = () => (
      <div
        className="flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-blackLight/50 z-30"
        onClick={() => setter(prev => !prev)}
      />
    );
  
    return (
      <>
        <div className={`${className} ${appendClass} ${bgColor} ${textColor}`}>
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                route={item.route}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        {show && <ModalOverlay />}
      </>
    );
  };
  
  export default Navigation