import { NextResponse } from "next/server"
export async function GET (req){

  const projectData = await prisma.projects.findMany({
   where:{
    status:'COMPLETED',
    type:'LONGTERM'
   }
  })
  return  NextResponse.json(projectData,{status:200})

}