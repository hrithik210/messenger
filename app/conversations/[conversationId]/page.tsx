import getConversationbyId from "@/app/actions/getConversationbyId";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "../components/Header";
import Body from "../components/Body";
import Form from "../components/Form";


interface Iparams{
  conversationId: string;
}

const conversationId = async( { params }: { params: Iparams }) =>{

  const conversation  = await getConversationbyId(params.conversationId);
  const messages = await getMessages(params.conversationId);


  if(!conversation){
    return <div className="lg:pl-80 h-full ">

      <div className="h-full flex flex-col">
        <EmptyState />
      </div>

    </div>
  }
  return (
    <div className="lg:pl-80 h-full ">
      <div className="h-full flex flex-col">
        <Header conversation = {conversation} />
        <Body initialMessages ={messages} />
        <Form />
      </div>
  
    </div>
  )
}


export default conversationId;