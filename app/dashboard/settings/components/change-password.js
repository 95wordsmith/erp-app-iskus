'use client'
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCreateUserModal } from "@/hooks/useCreateUserModal";
import CreateUserForm from "./create-user-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PlusSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ChangePasswordForm from "./change-password-form";


const ChangePassword = () => {
  const {data:session}= useSession()
  const role = session?.user?.role === 'ADMIN'
  const router = useRouter()

  const accessControls = useCreateUserModal()
  const openModal =()=>{
   if(role){
    router.push('/access')
   }else{
     accessControls.onOpen();
  }
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