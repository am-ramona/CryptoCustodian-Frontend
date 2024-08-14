import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Workspace, Dashboard, Row, DataVis_1, CustomerService, IbmOpenshiftContainerPlatformOnVpcForRegulatedIndustries } from '@carbon/icons-react'

type SidebarProps = {  
    show: boolean;  
    setter: React.Dispatch<React.SetStateAction<boolean>>;  
  };  
  
type MenuItemProps = {  
    icon: React.ReactNode;  
    name: string;  
    route: string;  
  };  

  const Navigation: React.FC<SidebarProps> = ({ show, setter }) => { 
    const router = useRouter();

    const className = "bg-blackLight w-[250px] h-[calc(100vh-12.5rem)] transition-[margin-left] ease-in-out duration-500 fixed md:static top-60 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route }) => { 
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-offWhite" : "text-offWhite/50 hover:text-offWhite";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-blackLight/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="p-2 flex">
                    <Link href="/" className="text-red">
                       Karpatkey
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Dashboard"
                        route="/"
                        icon={<Workspace />}
                    />
                    <MenuItem
                        name="Assets Overview"
                        route="/assetOverview"
                        icon={<Dashboard />}
                    />
                    <MenuItem
                        name="Positions and Holdings"
                        route="/positionsAndHoldings"
                        icon={<Row />}
                    />
                    <MenuItem
                        name="APR and Performance Metrics"
                        route="/aprAndPerformanceMetrics"
                        icon={<DataVis_1 />}
                    />
                    <MenuItem
                        name="Client Management"
                        route="/clientManagement"
                        icon={<CustomerService />}
                    />
                    <MenuItem
                        name="Transaction and Compliance"
                        route="/transactionAndCompliance"
                        icon={<IbmOpenshiftContainerPlatformOnVpcForRegulatedIndustries />}
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}

export default Navigation