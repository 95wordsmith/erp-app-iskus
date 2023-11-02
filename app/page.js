
import SignOutButton from "@/components/SignoutButton";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";



const Homepage = async () => {

    const session = await getServerSession(authOptions)

    if(!session?.user){ 
        redirect('/auth/login')
    } else {
        redirect('/dashboard')
    }

  
  
}
 
export default Homepage;