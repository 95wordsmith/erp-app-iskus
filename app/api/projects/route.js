import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(res) {
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

  try {
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

    return NextResponse.json(projectData, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
