import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversations = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((members: { value: string }) => ({
                id: members.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversations);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
                equals : [currentUser.id , userId]
            }
          },
          {
            userIds :{
                equals : [userId , currentUser.id]
            }
          }
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if(singleConversation){
        return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
        data : {
            users : {
                connect :[
                    {
                        id : currentUser.id
                    },
                    {
                        id : userId
                    }
                ]
            }
        },
        include : {
            users: true
        }
    });

    return NextResponse.json(newConversation);  
  
} catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
