import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationbyId = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser?.email){
      return null;
    }
    
    const conversation = prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include : {
        users : true
      }
    })

    return conversation ;
  } catch (error){
    return null ;
  }
}


export default getConversationbyId;