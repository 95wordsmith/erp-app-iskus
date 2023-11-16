'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 
const RefreshButton = () => {
  const refresh =()=>{
      window.location.reload()
  }
  const router = useRouter()
  return ( 
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
    <Button onClick={refresh} variant='ghost'><RefreshCcw/> </Button>
    </TooltipTrigger>
        <TooltipContent>
          <p>Refresh Page</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   );
}
 
export default RefreshButton;