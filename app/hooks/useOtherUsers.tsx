import { useSession } from "next-auth/react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useMemo } from "react";


const useOtherUsers = (conversation : FullConversationType | {
  users:  User[]
}) => {
  const session  = useSession();
  const otherUsers = useMemo(() => {
    const currentUserEmail =  session?.data?.user?.email;

    const otherUsers = conversation.users.filter((user) => user.email !== currentUserEmail)
    return otherUsers[0];
  },[session?.data?.user?.email , conversation.users]);

  return otherUsers;

}

export default useOtherUsers;