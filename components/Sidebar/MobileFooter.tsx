"use client";

import useConversation from "@/app/hooks/UseConversation";
import useRoutes from "@/app/hooks/UseRoutes";
import MobileItem from "./MobileItem";


const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if(isOpen){
    return null; 
  }

  return (
    <div className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
        ">
            {routes.map((route) => (
               <MobileItem
                key = {route.href} 
                href = {route.href}
                onClick = {route.onClick}
                icon = {route.icon}
                active = {route.active}
                /> 
            ))}

    </div>
  )
}

export default MobileFooter