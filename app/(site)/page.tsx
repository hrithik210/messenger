import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col justify-center
    py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <Image 
        alt="logo"
        height="50"
        width="120"
        className="mx-auto w-auto"
        src='/logo.png'
        />
        <h2
        className="text-center text-3xl font-bold tracking-tight
        text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
      
    </div>
  );
}
