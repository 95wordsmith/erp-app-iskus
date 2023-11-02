import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboadPage =async () => {
  const session = await getServerSession(authOptions)

    if(!session?.user){ 
        redirect('/auth/login')
    }

  return ( 
    <>
    This is the dashboard page
    </>
   );
}
 
export default DashboadPage;