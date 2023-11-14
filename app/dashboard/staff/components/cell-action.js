"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";


export const CellAction = ({ data }) => {
  const {toast}= useToast()
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

 

  const onDelete = async () => {
    const {id} =data
      setLoading(true);
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setOpen(false)
      router.refresh();
      toast({
        title:'Success!',
        description:'User Deleted Successfully!',
      })
      window.location.reload()
     

    } catch (error) {
      console.log(error.message)
      toast({
        title:'Error',
        description:'Something went wrong!',
        variant: 'destructive'
      })
    }finally{
            setLoading(false);
      setOpen(false);
    }
  
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.profileId? <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/staff/${data.profileId}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
             Update
          </DropdownMenuItem>:
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/staff/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
             Add Details
          </DropdownMenuItem>}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
