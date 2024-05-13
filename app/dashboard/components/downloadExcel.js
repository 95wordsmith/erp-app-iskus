'use client'
import { Button } from "@/components/ui/button";
import { downloadToExcel } from "@/lib/xlsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast";
import {Download}from 'lucide-react'
const DownloadExcel = ({data,type}) => {
  const { toast } = useToast();

    const  downloadExcel =async()=>{
      try {
       await downloadToExcel(data,type)
        toast({
          title: "Success!",
          description: "Download Complete",
        });      
      } catch (error) {
        toast({
          title: "'Error!",
          description: "Something went wrong!",
          variant: "destructive",

        });
      }
  }
  return ( 
    <>
   <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
    <Button onClick={downloadExcel}><Download/></Button>

    </TooltipTrigger>
        <TooltipContent>
          <p>Download Data to Excel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
      
    </>
   );
}
 
export default DownloadExcel;