import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession(authOptions)
  console.log('the seesion is ',session?.user?.id)


  const body = await req.json();
  console.log('this is the body',body)
  const { fullName, email, phoneNumber, address, dateOfBirth, position } = body;

  try {
    const userProfile = await prisma.profile.upsert({
      where: { userId: session?.user?.id },
      update: {
        fullName,
        email,
        phoneNumber:Number(phoneNumber),
        address,
        dateOfBirth,
        position,
      },
      create: {
        fullName,
        email,
        phoneNumber:Number(phoneNumber),
        address,
        dateOfBirth,
        position,
        user: { connect: { id: session?.user?.id } },
      },
    });
    return NextResponse.json(
      { userProfile, message: "Profile created/updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
export async function GET (req){
    try {
      const profileData = await prisma.user.findMany({
        select:{
          id:true,
          username:true,
          role:true,
          profile:{
            select:{
              id:true,
              fullName: true,
              email: true,
              phoneNumber: true,
              position:true
            }

          }
        }
      })
      return NextResponse.json({profileData, message:'Profile data retrived successfully'}, {status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }

}