// 'use client'
import prisma from "@/lib/prisma";
// import { useProjectData } from "@/hooks/useProjectData";
import { ProjectClient } from "./components/client";
import ProjectHeader from "./components/projectHeader";


const ProjectsPage = async() => {

  // const projectData =useProjectData()
  // if(!projectData){
  //   return null
  // }
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


  return ( 
  <>
    <div className="border-b  p-6 ">
<ProjectHeader projectData={projectData}/>
  </div>
  <div className="container py-6">
    <ProjectClient data={projectData}/>
  </div>

  </> 
  );
}
 
export default ProjectsPage;