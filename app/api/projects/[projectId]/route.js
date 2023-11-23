import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  
  
  try {
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
    return NextResponse.json({projectData});
  } catch (error) {
    console.log(error);
    return new NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  
  try {
    const { projectId } = params;
    const deleteUser = await prisma.projects.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(
      {deletedUser:deleteUser,  message: "Project deleted successfully" },
   
    );
  } catch (error) {
    console.error(error.message);
    return new NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
