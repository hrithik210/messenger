import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface Iparams {
  conversationId : string ;
}

export async function DELETE(req : Request ,
  {params} : {params :Iparams}
){
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if(!currentUser){
      return new NextResponse("unauthorized", {status : 401})
    };

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if(!existingConversation){
      return new NextResponse("conversation not found", {status : 404})
    };

    const deleteConversation = await prisma.conversation.delete({
      where :{
        id : conversationId,
        userIds :{
          hasSome : [currentUser.id]
        }
      }
    })

    existingConversation.users.forEach((user) => {
      if(user.email){
        pusherServer.trigger(user.email,"conversation:remove", existingConversation)
      }
    })

    return NextResponse.json({ message: "conversation deleted", data: deleteConversation })
  } catch (error) {
    console.log(error ,"conversation delete error")
    return new NextResponse("internal error", {status : 500})
  }  
}