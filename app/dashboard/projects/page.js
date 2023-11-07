'use client'
import { useProjectData } from "@/hooks/useProjectData";
import { ProjectClient } from "./components/client";
import ProjectHeader from "./components/projectHeader";


const ProjectsPage = () => {

  const projectData =useProjectData()
  if(!projectData){
    return null
  }


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