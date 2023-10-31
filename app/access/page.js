'use client'
import { Button } from "@/components/ui/button";
import { ChevronLeftSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const AccessDenied = () => {
  const router = useRouter()
  return (
    <div className="h-screen gap-4 bg-black/70 text-red-500 text-center  flex flex-col justify-center items-center">
      <h1 className="text-7xl">ACCESS DENIED!</h1>
      <h2  className="text-xl"  >You dont Not Possess Super Admin Privilages to perform this task</h2>
      <h2 className="text-xl">Contact your Super Admin for more information</h2>
      <Button variant='destructive' onClick={()=>router.back()} >
        <ChevronLeftSquare className="mr-2" /> Return to previous page
      </Button>
    </div>
  );
};

export default AccessDenied;
