"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user? : User
}


export const Avatar:React.FC<AvatarProps> = ({
    user
}) => {
  return (
    <div className="relative">
        <div className="
            relative
            inline-block
            rounded-full
            overflow-hidden
            h-8
            w-8"
        >
            <Image 
                alt="Avatar"
                src={user?.image || '/placeholder.jpg'}
                fill
                 
            />
                
        </div>

        <span className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            "
         />
    </div>
  )
}
