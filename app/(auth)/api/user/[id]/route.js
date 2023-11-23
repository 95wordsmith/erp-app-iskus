import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {deletedUser:deleteUser ,message: "User deleted successfully" }
    );
  } catch (error) {
    console.error(error.message);
    return new NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
