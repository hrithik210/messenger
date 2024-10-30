"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    icon : any ;
    href : string ;
    active? : boolean;
    onClick? : () => void;
}

const MobileItem:React.FC<MobileItemProps> = ({
    icon: Icon , 
    href, 
    active,
    onClick
}) => {
  const handleClick = () => {
    if(onClick){
        return onClick() ;
    }
  }
  return (
      
    <Link   href={href}
            onClick={onClick}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                p-4
                justify-center
                text-gray-500
                hover:text-black
                hover:bg-gray-100
                `,
                active && 'bg-gray-100 text-black'
            )}
    >
        
        <Icon  className = 'w-6 h-6'/>

    </Link>
  )
}

export default MobileItem