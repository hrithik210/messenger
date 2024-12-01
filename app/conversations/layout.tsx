import { Sidebar } from "@/components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversation from "../actions/getConversation";
import getUsers from "../actions/getUsers";

export default async function ConversationLayout({
  children } : { children: React.ReactNode }) {

    const conversations = await getConversation();
    const users = await getUsers();

    return (
      <Sidebar>
        <div className="h-full">
          <ConversationList
            users = {users}
            initialItems =  {conversations}
            />
          {children}
        </div>
      </Sidebar>
    )

  }