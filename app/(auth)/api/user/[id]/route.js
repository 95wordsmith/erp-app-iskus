
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}) {

 const {id}= params


  try {
   

    const deleteUser = await prisma.user.delete({
      where: {
        id
      },
    });



    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
