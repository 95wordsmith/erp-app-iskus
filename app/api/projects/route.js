import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export async function POST (res){
// const data = await res.json()
// console.log(data)
  const {title,pinNum,type,customer,location, amountTotal, status, invoiceUrl } =await res.json()
// console.log(title,pinNum,type,customer,location, amountTotal, status, invoiceUrl)
try {
  const projectData = await prisma.projects.create({
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

 return  NextResponse.json('success',{status:201})
  
} catch (error) {
  console.log(error)
}
}

export async function GET (req){

  const projectData = await prisma.projects.findMany({
    select : {
      id : true,
      title :true,
      type:true,
      customer:true,
      status:true,
      amountTotal:true,
      createdAt:true
    }
  })
  return  NextResponse.json(projectData,{status:200})

}