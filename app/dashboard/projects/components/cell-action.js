"use client";
import { useToast } from "@/components/ui/use-toast";
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

export const CellAction = ({ data }) => {
  const {toast} = useToast()
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const onDelete = async () => {
    const {id} =data
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setOpen(false)
      toast({
        title:'Success!',
        description:'Project deleted successfully!'
      })
      setTimeout(() => {
        window.location.reload()
        
      }, 1000);
    } catch (error) {
      console.log(error.message)
      toast({
        title:'Error',
        description:'Something went wrong!',
        variant: 'destructive'
      })
    }
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${data.id}`);
    //   router.refresh();
    //   router.push(`/${params.storeId}/products`)
    //   toast.success("Product deleted.");
    // } catch (error) {
    //   toast.error(
    //     "Something went wrong."
    //   );
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };
  const onDownload =()=>{
    const {invoiceUrl} =data
    window.open(invoiceUrl,'_blank')
  }

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
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/projects/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDownload}>
            <Edit className="mr-2 h-4 w-4" />
            Download Invoice
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
