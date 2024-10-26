import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function POST(req : Request){

    try {
        const body = await req.json();
    
        const { email , name , password} = body
        
        if(!email || !name || !password){
            return new NextResponse('missing info please enter values' , {status :400})
        }
    
        const hashedPassword = await bcrypt.hash(password , 12)
    
        const user  = await prisma.user.create({
            data : {
                email,
                name,
                hashedPassword
            }
        })
        return NextResponse.json('Account Created');
        
    } catch (error) {
        console.log(error , "Registeration error")
        return new NextResponse("internal error while registering", {status : 411})
        
    }
}