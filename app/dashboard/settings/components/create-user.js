'use client'
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCreateUserModal } from "@/hooks/useCreateUserModal";
import CreateUserForm from "./create-user-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PlusSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";


const CreateUser = () => {
  const {data:session}= useSession()
  const role = session?.user?.role === 'ADMIN'
  // console.log(session?.user)
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
    <Modal title='User Access Login Credentials' description='Create access login credentials for staff and define thier levels of access' isOpen={accessControls.isOpen} onClose={accessControls.onClose}>
      <CreateUserForm/>
    </Modal>
    </>
   );
}


 

export default CreateUser;