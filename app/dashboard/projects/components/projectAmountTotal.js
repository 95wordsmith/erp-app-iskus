import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const ProjectAmountTotal = ({projectData}) => {
  
  const total = projectData.map((amount)=>amount.amountTotal).reduce((acc,cur)=>acc+cur,0).toFixed(2)
  console.log(total)

  function formatAmountToGHC(amount) {
   
    const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
    }).format(amount);
    return formatted;
}

const amountTotal = formatAmountToGHC(total)
  return ( 
    <>
     <div className="w-[300px]">
    <Card className={cn("py-16 ")}>
      <h1 className="text-3xl text-center font-medium pb-6"> Amount Gained</h1>
      <h1 className="text-2xl text-center font-semibold"> {amountTotal}</h1>  
    </Card>
  </div>
    </>
   );
}
 
export default ProjectAmountTotal;