"use client";

import { User } from "@prisma/client";
import axios from "axios";

import { useCallback, useState } from "react";
import { Avatar } from "./Avatar";
import { useRouter } from "next/navigation";
import LoadingModel from "./LoadingModel";

interface UserBoxProps {
    data: User
}
const UserBox:React.FC<UserBoxProps> = ({
    data
}) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false)


  const handleClick = useCallback(() => {
    setisLoading(true);

    axios
      .post("/api/conversation", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setisLoading(false));
  }, [data , router]);
 
  return (
  <>
    {isLoading && (
      <LoadingModel />
    )}
    <div 
      onClick = {handleClick}
      className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      ">
        <Avatar user={data}/>
        <div className="min-w-0 flex-1">
          <div className="focus:outline-line">
            <div className="
            flex
            justify-between
            items-center
            mb-1
            ">
            
              <p className=" text-sm
                  font-medium
                  text-gray-900
                  ">
                    {data.name}
              </p>

            </div>
          </div>
        </div>

    </div>
  </>
  )
}

export default UserBox