"use client";

import Modal from "@/components/Modal";
import Image from "next/image";

interface ImageModelProps{
  isOpen ?: boolean ;
  onClose : () => void ;
  src : string | null ;
}

const ImageModel = ({
  isOpen,
  onClose,
  src
}:ImageModelProps) => {

  if(!src){
    return null
  }
  return (
   <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80 ">
        <Image
          alt="Image"
          src={src}
          className="object-cover"
          fill
          
         />
      </div>
   </Modal>
  )
}

export default ImageModel