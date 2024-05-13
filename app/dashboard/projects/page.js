import prisma from "@/lib/prisma";

import { ProjectClient } from "./components/client";
import ProjectHeader from "./components/projectHeader";

export const revalidate = 0
const ProjectsPage = async () => {
  const projectData = await prisma.projects.findMany();

  return (
    <>
      <div className="border-b  p-6 ">
        <ProjectHeader projectData={projectData} />
      </div>
      <div className="container py-6">
        <ProjectClient data={projectData} />
      </div>
    </>
  );
};

export default ProjectsPage;
