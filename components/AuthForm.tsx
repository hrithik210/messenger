"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm , SubmitHandler } from "react-hook-form";
import Input from "./ui/Input";

type Variant = "Login" | "Register";

const AuthForm = () => {
    const [variant, setvariant] = useState<Variant>('Login')
    const [loading, setisLoading] = useState(false)
    const toggleVariant = useCallback(() => {
        if (variant === 'Login') {
            setvariant('Register')
        }else{
            setvariant('Login')
        }
    },[])

    const {
        register ,
        handleSubmit, 
        formState: { errors }
    } = useForm<FieldValues>({
       defaultValues:{
              name : '',
              email: '',
              password: ''
       } 
    })
    const onSubmit : SubmitHandler<FieldValues>= (data) => {
        setisLoading(true);

        if(variant === 'Register'){
            //axios request to register
        }
        if(variant === 'Login'){
            //Next signIn
        }
    }

    const socialAction = (action : string) => {
        setisLoading(true);
        //next auth social signiN
    }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}>
                <Input id="email" label="Email"
                    register={register}
                />
                
            </form>
        </div>
    </div>
  )
}

export default AuthForm