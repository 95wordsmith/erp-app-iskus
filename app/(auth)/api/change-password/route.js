import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { hash } from "bcrypt";

export async function PATCH(req) {
  const { oldPassword, newPassword } = await req.json();

  const session = await getServerSession(authOptions);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    const passwordMatch = await compare(oldPassword, existingUser.password);
    if (!passwordMatch) {
      return NextResponse.json("Passwords Do Not Match", { status: 401 });
    }
    const hashedPassword = await hash(newPassword, 10);
    const changedPassword = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json(changedPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
