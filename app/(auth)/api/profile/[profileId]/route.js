import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req, { params }) {
  
  try {
    const { profileId } = params;
    const body = await req.json();
    const { fullName, email, phoneNumber, address, position } = body;
    const addProfileDetails = await prisma.user.update({
      where: { id: profileId },
      data: {
        profile: {
          create: {
            fullName,
            email,
            phoneNumber: Number(phoneNumber),
            address,
            position,
          },
        },
      },
    });

    return NextResponse.json(
      { profileDetails:addProfileDetails, message: "Profile created successfully" },);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { profileId } = params;
  
    const body = await req.json();
  
    const { fullName, email, phoneNumber, address, position } = body;
    const updateProfileDetails = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        fullName,
        email,
        phoneNumber:Number(phoneNumber),
        address,
        position,
      },
    });
    return NextResponse.json(
      { updatedProfileDetails:updateProfileDetails, message: "Profile updated successfully" }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}


export async function DELETE(req,{params}) {

  const { profileId } = params;


  try {
   

    const deleteUser = await prisma.profile.delete({
      where: {
        id:profileId
      },
    });



    return NextResponse.json(
      { message: 'Profile deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
