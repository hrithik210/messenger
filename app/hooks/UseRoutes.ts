import { usePathname } from "next/navigation"
import useConversation from "./UseConversation";
import { useMemo } from "react";
import { HiChat} from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";



const useRoutes = () =>{
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(()=>[
        {
          label : 'Chat',
          href : "/coversations",
          icon: HiChat ,
          isActive : pathname === '/conversations' || !!conversationId
        },
        {
            label : 'Users',
            href : '/users',
            icon : HiUsers,
            isActive: pathname === '/users'

        },{
            label : 'Logout',
            href : '#',
            onclick : ()=> signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ],[pathname , conversationId]);
};

export default useRoutes ;