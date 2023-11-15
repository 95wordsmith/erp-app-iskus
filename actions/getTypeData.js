import prisma from "@/lib/prisma";
const getTypeData = async (start, end) => {

const longTerm =  start && end
? await prisma.projects.findMany({
  where: {
    type:'LONGTERM',
    status:'COMPLETED',
    date: {
      gte: new Date(start),
      lt: new Date(end),
    },
  },
  
  select:{
    amountTotal:true
  }
}):null
const job =  start && end
? await prisma.projects.findMany({
  where: {
    type:'JOB',
    status:'COMPLETED',
    date: {
      gte: new Date(start),
      lt: new Date(end),
    },
  },
  select:{
    amountTotal:true
  }
}):null

const longTermRevenue = longTerm?.reduce((acc, tot) => acc + tot.amountTotal, 0);
const longTermNumber = longTerm?.length
const jobRevenue = job?.reduce((acc, tot) => acc + tot.amountTotal, 0);
const jobNumber = job?.length
   return { longTermRevenue,longTermNumber,jobRevenue,jobNumber}
};


export default getTypeData