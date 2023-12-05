'use client'
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCreateUserModal } from "@/hooks/useCreateUserModal";
import { useRouter } from "next/navigation";
import { PlusSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ChangePasswordForm from "./change-password-form";
import { useChangePasswordModal } from "@/hooks/useChangePasswordModal";


const ChangePassword = () => {

  const accessControls = useChangePasswordModal()

  const openModal =()=>{
     accessControls.onOpen();
  }
  
  return ( 
    <>
    <Button onClick={openModal} className ={cn('flex gap-2 ml-6')} variant='outline' >
      <User/>
      <PlusSquare/>
    </Button>
    <Modal title='Change Password' description='Verify your old password and add a new one.' isOpen={accessControls.isOpen} onClose={accessControls.onClose}>
      <ChangePasswordForm/>
    </Modal>
    </>
   );
}


 

export default ChangePassword;