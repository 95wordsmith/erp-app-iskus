import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ProjectTotal = ({projectData}) => {
    const total = projectData.length
    const job = projectData.filter((type)=>type.type==='JOB').length
    const longTerm = projectData.filter((type)=>type.type==='LONGTERM').length

 
  return ( 
    <div className="w-[300px]">
    <Card className={cn("py-3 ")}>
      <h1 className="text-3xl text-center font-medium">Projects</h1>
      <div className="grid  pt-3 place-content-center">
        <div className="w-20 h-20 rounded-lg flex justify-center bg-black text-white items-center text-5xl">
          {total}
        </div>
      </div>
      <div className="grid grid-cols-2 pt-3 gap-x-8 text-xl ml-16">
        <div>Jobs</div>
        <div className="font-semibold">{job}</div>
        <div>LongTerm</div>
        <div className="font-semibold">{longTerm}</div>
      </div>
    </Card>
  </div>
   );
}
 
export default ProjectTotal;