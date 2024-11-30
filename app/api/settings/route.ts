import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req : Request){
  try {
    const currenUser = await getCurrentUser();
    const body = await req.json();
    const {name ,image} = body

    if(!currenUser){
      return new  NextResponse("unauthorized" , {status : 401})
    }
    const updatedUser = await prisma.user.update({
      where: {
        id : currenUser.id
      },
      data: {
        image : image ,
        name  :name
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error , "Setting error");
    return new NextResponse(
      "internal error" , {status : 500}
    )
  }

}