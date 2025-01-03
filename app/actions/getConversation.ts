import  prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getConversation() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id){
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy :{
        lastMessageAt: 'desc'
      },
      where : {
        userIds : {
          has : currentUser.id
        }
      },
      include : { 
        users : true, 
        message : {
          include : {
            sender: true ,
            seen : true
          }
        }
      }
    });
    return conversations;
  } catch (error) {
    return [];
  }
}
