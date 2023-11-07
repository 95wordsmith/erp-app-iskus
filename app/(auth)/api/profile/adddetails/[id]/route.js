import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req, {params}) {
 
  const { id } = params;


  const body = await req.json();
  // console.log('this is the body',body)
  const { fullName, email, phoneNumber, address, formmatedDate, position } = body;

  try {
    const userProfile = await prisma.profile.upsert({
      where: { userId: id },
      update: {
        fullName,
        email,
        phoneNumber:Number(phoneNumber),
        address,
        dateOfBirth:formmatedDate,
        position,
      },
      create: {
        fullName,
        email,
        phoneNumber:Number(phoneNumber),
        address,
        dateOfBirth:formmatedDate,
        position,
        user: { connect: { id: id } },
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