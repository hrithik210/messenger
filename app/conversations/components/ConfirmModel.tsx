"use client";

import useConversation from "@/app/hooks/UseConversation";
import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import { DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";



interface ConfirmModelProps {
  isOpen ? : boolean ;
  onClose : () => void ;

}

const ConfirmModel = ({
  isOpen ,
  onClose
}:ConfirmModelProps) => {
  
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isloading , setisLoading]  = useState(false);

  const onDelete = useCallback(() => {
    setisLoading(true);
    axios.delete(`/api/conversation/${conversationId}`)
    .then(() => {
      onClose();
      router.push('/conversations')
    }).catch(() => toast.error("something went wrong"))
    .finally(() => setisLoading(false))
  },[conversationId , router , onClose]);


  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto 
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            sm:h-10
            sm:w-10
            sm:mx-0
            ">
              <FiAlertTriangle
              className="h-6 w-6 text-red-600"
               />
            </div>
            <div className="mt-3 
                  text-center 
                  sm:ml-4 
                  sm:mt-0
                  sm:text-left">
                <DialogTitle as="h3"
                  className="text-base
                    font-semibold
                    leading-6
                    text-gray-900
                  ">
                    Delete Conversation
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You sure ? You cannot undo this action afterwards.
                  </p>
                </div>
            </div>
          </div>
          <div className="
            mt-5 
            sm:mt-4 
            sm:flex 
            sm:flex-row-reverse">
            
            <Button disabled={isloading}
              danger
              onclick={onDelete}
              >
              Delete
            </Button>

            <Button disabled={isloading}
              secondary
              onclick={onClose}
              >
              Cancel
            </Button>
          </div>
        </Modal>
    </div>
  )
}

export default ConfirmModel