"use client";

import useConversation from "@/app/hooks/UseConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProos {
  initialMessages: FullMessageType[]
}

const Body = ({
    initialMessages
} : BodyProos) => {

  const [messages , setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`)
  }, [conversationId])
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message , index) => (
        <MessageBox
          islast = {index === messages.length-1 }
          key ={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body