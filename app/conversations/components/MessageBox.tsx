"use client";

import { FullMessageType } from "@/app/types";
import { Avatar } from "@/components/Avatar";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {format} from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModel from "./ImageModel";

interface MessageBoxProps{
  islast?:boolean ;
  data : FullMessageType
}

const MessageBox = ({
  islast,
  data
} : MessageBoxProps) => {

  const session = useSession();
  const [imageModelOpen , setImageModelOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data.sender.email ;
  
  const seenList = (data.seen || []).filter((user) => 
    user.email !== data?.sender.email).map((user) => user.name).join(", ");

  const container = clsx(
    'flex gap-3 p-4',
    isOwn && "justify-end", 
);

  const avatar = clsx( isOwn && "order-2")

  const body  = clsx('flex flex-col gap-2' ,
    isOwn && "items-end"
  )

  const message = clsx("text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white " : "bg-gray-100",
    data.image ? "rounded-md p-0": "rounded-full py-2 p-3"
  )


  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400 ">
            {format(new Date(data.createdAt) , 'p')}
          </div>
        </div>
        <div className={message}>
            <ImageModel
              src={data.image}
              isOpen={imageModelOpen}
              onClose={() => setImageModelOpen(false)}

             />
            {data.image ?(
              <Image 
                onClick={() => setImageModelOpen(true)}
                alt="image"
                height="288"
                width="288"
                src={data.image}
                className="object-cover cursor-pointe
                translate"
              />
            ) :(
              <div>
                {data.body}
              </div>
            )}
        </div>
        {isOwn && islast &&  seenList.length >0 && (
          <div className="text-xs
                    font-light
                  text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox