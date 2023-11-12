import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { profileId } = params;
  try {
    const profileData = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });
    return NextResponse.json(
      { profileData, message: "Individual Profile data retrived successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { profileId } = params;
  const body = await req.json();
  const { fullName, email, phoneNumber, address, position } = body;

  try {
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
      { addProfileDetails, message: "Profile created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { profileId } = params;

  const body = await req.json();

  const { fullName, email, phoneNumber, address, position } = body;
  try {
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
      { updateProfileDetails, message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
