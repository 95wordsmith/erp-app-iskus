
import SignOutButton from "@/components/SignoutButton";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";



const Homepage = async () => {

    const session = await getServerSession(authOptions)

    // console.log(session)
    if(!session?.user){
      
        redirect('/auth/login')
    }

    return ( 
    <>
    <h1>Welcome Back {session?.user?.username}</h1>
    <h2> {session?.user?.role}</h2>
        <SignOutButton/>
 

    </>
     );
  
}
 
export default Homepage;