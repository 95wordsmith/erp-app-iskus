import { NextResponse } from "next/server";
export async function GET (req,{params}){
  const { projectId } = params;
  // console.log('project id',projectId)
  
try {
  const projectData = await prisma.projects.findUnique({

    where:{
      id:projectId
    },
    select : {
      amountTotal:true,
      createdAt:true,
      customer:true,
      invoiceUrl:true,
      location:true,
      pinNum:true,
      title :true,
      status:true,
      type:true,
     
    }
  })
  return  NextResponse.json(projectData,{status:200})
  
} catch (error) {
  console.log(error.message)
  
}

}

export async function PATCH (req,{params}){
  const { projectId } = params;
  const {title,pinNum,type,customer,location, amountTotal, status, invoiceUrl } =await req.json()

  // console.log('project id',projectId)
  
try {
  const projectData = await prisma.projects.update({

    where:{
      id:projectId
    },
    data:{
      title,
      pinNum,
      type,
      customer,
      location,
      amountTotal:Number(amountTotal),
      status,
      invoiceUrl  
     } 
  })
  return  NextResponse.json(projectData,{status:200})
  
} catch (error) {
  console.log(error.message)
  
}

}