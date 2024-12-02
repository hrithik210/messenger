import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface Iparams{
  conversationId? : string
}

export async function POST(req : Request ,
  {params} : {params : Iparams}
){
  try {
    const currentUser  = await getCurrentUser();
    const {conversationId} = params;

    if(!currentUser?.id || !currentUser?.email ){
      return new NextResponse(
        "Unauthorized" , {status : 401}
      )
    }

    const conversation  = await prisma.conversation.findUnique({
      where : {
        id : conversationId
      },
      include : {
        message : {
          include :{
            seen : true
          }
        },
        users : true
      }
    });

    if(!conversation){
      return new NextResponse("invalid id" ,{status : 400});
    }

    const lastMessage = conversation.message[conversation.message.length - 1];

    if(!lastMessage){
      return NextResponse.json(conversation);
    }

    const updateMesage  = await prisma.message.update({
      where :{
        id : lastMessage.id
      },
      include :{
        sender : true,
        seen : true
      },
      data : {
        seen : {
          connect : {
            id : currentUser.id
          }
        }
      }
    })

  await pusherServer.trigger(currentUser.email,"conversation:update" ,{
      id : conversationId,
      message: [updateMesage]
  })

  if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
      return NextResponse.json(conversation)
  }
    
await pusherServer.trigger(conversationId!, "message:update",updateMesage)
return NextResponse.json(updateMesage);

} catch (error : any) {
    console.log(error);
    return new NextResponse("internal error" , {status : 500});
  }
}