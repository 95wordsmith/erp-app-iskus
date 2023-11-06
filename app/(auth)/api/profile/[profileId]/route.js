import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




    export async function GET (request, {params}){
    const { profileId } = params;
    try {
      const profileData = await prisma.profile.findUnique({
            where:{
                id:profileId
            }
      })
      return NextResponse.json({profileData, message:'Individual Profile data retrived successfully'}, {status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }

}

export async function PATCH (request, {params}){
  const { profileId } = params;

  const data = await request.json()

  console.log(profileId,data)
  try {
    
    
      const updateProfileDate = await prisma.profile.update({
        where:{
          id:profileId
        },
        data:{
          fullName:data.fullName,
          email:data.email,
          phoneNumber:Number(data.phoneNumber),
          address:data.address,
          dateOfBirth:data.formmatedDate,
          position:data.position
        }
      })
    
      return NextResponse.json(updateProfileDate,{status:200})
  } catch (error) {
    console.log(error.message)
    return NextResponse.json('something went wrong',{status:500})
    
  }
 

}




   
