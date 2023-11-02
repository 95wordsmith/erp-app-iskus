import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(request, {params}) {

    const { id } = params;

    console.log('this is the id',id)
    

   

    return NextResponse.json('sucess', { status: 200 });
}