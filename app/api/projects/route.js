import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(res) {
  
  try {
    const {
      title,
      pinNum,
      type,
      customer,
      location,
      amountTotal,
      status,
      invoiceUrl,
      date,
    } = await res.json();
    const projectData = await prisma.projects.create({
      data: {
        title,
        pinNum,
        type,
        customer,
        location,
        amountTotal: Number(amountTotal),
        status,
        invoiceUrl,
        date,
      },
    });

    return NextResponse.json({projectData});
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
