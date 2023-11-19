import prisma from "@/lib/prisma";
import { ProjectForm } from "./components/projectForm";
export const revalidate =0
const projectCreateOrUpdate = async ({ params }) => {
  const { projectId } = params;
  const projectData = await prisma.projects.findUnique({
    where: {
      id: projectId,
    },
    select: {
      amountTotal: true,
      date: true,
      customer: true,
      invoiceUrl: true,
      location: true,
      pinNum: true,
      title: true,
      status: true,
      type: true,
    },
  });

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProjectForm intialData={projectData} />
        </div>
      </div>
    </>
  );
};

export default projectCreateOrUpdate;
