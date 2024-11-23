"use client";

import { FullMessageType } from "@/app/types";

interface BodyProos {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProos> = () => {
  return (
    <div className="flex flex-1 overflow-y-auto">
      Body
    </div>
  )
}

export default Body