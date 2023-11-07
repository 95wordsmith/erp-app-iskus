import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ProjectStatus = ({projectData}) => {
  const pending = projectData.filter((type)=>type.status==='PENDING').length
  const ongoing = projectData.filter((type)=>type.status==='ONGOING').length
  const completed = projectData.filter((type)=>type.status==='COMPLETED').length

  return ( 
    <>
      <div className="w-[300px]">
    <Card className={cn("py-3 ")}>
      <h1 className="text-3xl text-center font-medium">Status</h1>
      <div className="grid grid-rows-3 gap-4 place-content-center py-1 text-xl">
        <div className="w-60 h-10 rounded-full  flex items-center justify-around bg-yellow-400  font-semibold ">
          <h1>PENDING</h1>
          <h1>{pending}</h1>
        </div>
        <div className="w-60 h-10 rounded-full  flex items-center justify-around bg-blue-400  font-semibold">
        <h1>ONGOING</h1>
          <h1>{ongoing}</h1>
        </div>
        <div className="w-60 h-10 rounded-full  flex items-center justify-around bg-green-400  font-semibold">
        <h1>COMPLETED</h1>
          <h1>{completed}</h1>
        </div>
      </div>

    </Card>
  
  </div>
    </>
   );
}
 
export default ProjectStatus;