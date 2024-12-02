"use client";

import useConversation from "@/app/hooks/UseConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { find } from "lodash";
import { pusherClient } from "@/app/libs/pusher";

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

  useEffect(() => {
    if (typeof conversationId !== "string") return;
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message : FullMessageType) => {
      axios.post(`/api/conversation/${conversationId}/seen`)
      setMessages((current) => {
        if(find(current ,{id : message.id})){
          return current;
        }

        return [...current ,message]
      })
      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage : FullMessageType) => {
      setMessages( (current) =>current.map((currentMessage) => {
        if(currentMessage.id === newMessage.id){
          return newMessage;
        }
        return currentMessage;
      }))
    }


    pusherClient.bind("messages:new" , messageHandler);
    pusherClient.bind("message:update" , updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new" , messageHandler)
      pusherClient.unbind("message:update" ,updateMessageHandler)
    }

  },[conversationId])
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