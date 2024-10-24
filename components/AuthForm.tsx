"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm , SubmitHandler } from "react-hook-form";
import Input from "./ui/Input";
import Button from "./ui/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "Login" | "Register";

const AuthForm = () => {
    const [variant, setvariant] = useState<Variant>('Login')
    const [isloading, setisLoading] = useState(false)
    const toggleVariant = useCallback(() => {
        if (variant === 'Login') {
            setvariant('Register')
        }else{
            setvariant('Login')
        }
    },[variant])

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

                {variant === 'Register' &&(
                    <Input 
                    id="name" 
                    label="Name"
                    register={register}
                    errors={errors}
                    disabled = {isloading}
                 />
                )}
                <Input 
                    id="email" 
                    label="Email"
                    type="email"
                    register={register}
                    errors={errors}
                    disabled = {isloading}
                
                />
                 <Input 
                    id="password" 
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                    disabled = {isloading}
                
                />

                <div>
                    <Button
                        disabled ={isloading}
                        fullwidth
                        type="submit"


                    >
                        {variant=== 'Login' ? 'Sign In' : 'Register'}
                    </Button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div
                         className="w-full border-t border-gray-300 "
                        />

                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex gap-2">
                    <AuthSocialButton
                        icon={BsGithub } 
                        onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton
                        icon={BsGoogle} 
                        onClick={() => socialAction('google')}
                    />
                </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div>
                    {variant === 'Login' ? 'Dont have an Account ?' : 'Already have an account'}
                </div>
                <div onClick= {toggleVariant}
                 className="underline cursor-pointer">
                    {variant === 'Login' ? 'Create Account' : 'Sign In'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm