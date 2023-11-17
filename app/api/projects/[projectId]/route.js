import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { projectId } = params;
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
  } = await req.json();
 

  try {
    const projectData = await prisma.projects.update({
      where: {
        id: projectId,
      },
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
    return NextResponse.json(projectData, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { projectId } = params;

  try {
    const deleteUser = await prisma.projects.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
