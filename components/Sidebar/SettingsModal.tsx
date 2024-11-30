"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../ui/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../ui/Button";

interface settingModalProps {
  isOpen ? : boolean ;
  onClose : () => void ;
  currentUser : User;
}

const SettingsModal = ({
  isOpen,
  onClose,
  currentUser
}: settingModalProps) => {
  
  const router = useRouter();
  const [isLoading , setisLoading] = useState(false);

  const  {
    register,
    handleSubmit,
    setValue,
    watch ,
    formState :{
      errors 
    }
  }  = useForm<FieldValues>({
    defaultValues : {
      name : currentUser?.name,
      image : currentUser?.image
    }
  });

  const image = watch("image");
  
  const handleUpload = (result : any) => {
    setValue("image" , result?.info?.secure_url,{
      shouldValidate : true
    })
  }

  const onSubmit : SubmitHandler<FieldValues> =( data ) => {
    setisLoading(true);
    axios.post("/api/settings", data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error("something went wrong"))
    .finally(() => setisLoading(false));
  }


  return (
      <Modal 
      onClose={onClose} 
      isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Edit your profile
              </p>
              <div className="
                    mt-10
                    flex
                    flex-col
                    gap-y-8">
                  <Input 
                    disabled={isLoading}
                    label="name"
                    id="name"
                    errors={errors}
                    required
                    register={register}
                  />

                  <div>
                    <label className="block text-sm
                                font-medium
                                leading-6 
                                text-gray-900 ">
                      Photo
                    </label>
                    <div className="
                    mt-2
                    flex
                    items-center
                    gap-x-3">
                      <Image 
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                        src={image || currentUser?.image || '/placeholder.jpg'}
                        alt="Avatar"
                      />
                      <CldUploadButton 
                      options={{maxFiles : 1}}
                      onSuccess={handleUpload}
                      uploadPreset="teukfdix">
                        <Button 
                        disabled={isLoading}
                        secondary
                        type="button"
                        >
                          Change
                        </Button>
                      </CldUploadButton>
                    </div>
                  </div>
              </div>
            </div>
            <div className="
            mt-6
            flex
            items-center
            justify-end
            gap-x-6">
              <Button disabled={isLoading} secondary
                onclick={onClose}>
                Cancel
              </Button>

              <Button disabled={isLoading}
                    type="submit">
                Save
              </Button>
            </div> 
          </div>
        </form>
      </Modal>
  )
}

export default SettingsModal