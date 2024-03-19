
import ProjectAmountTotal from "./projectAmountTotal";
import ProjectStatus from "./projectStatus";
import ProjectTotal from "./projectTotal";

const ProjectHeader = ({projectData}) => {
  return (
<div className="flex gap-8 justify-evenly flex-wrap">
<ProjectTotal projectData={projectData}/>
<ProjectStatus projectData={projectData}/>
<ProjectAmountTotal projectData={projectData}/>
</div>
  );
};

export default ProjectHeader;
