'use client'
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
const SignOutButton = () => {
  const {toast} = useToast()
  const logout =()=>{
    signOut()
    toast({
      title:'Sucess!',
      description:'You Have signed Out successfully!',
     
    })
  }
  return ( 
    <>
    <Button onClick ={logout}>Sign Out</Button>
    </>
   );
}
 
export default SignOutButton;