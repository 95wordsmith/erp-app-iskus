import CreateUser from "./components/create-user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";


const SettingsPage = async() => {
  // const session = await getServerSession(authOptions)
  // console.log(session.user.role)
  // const role =session.user.role!=='ADMIN'
  // console.log(role)
  
  return (
    <>
    <h1>This is the Settings page</h1>
    <CreateUser/>
  
    </>
   );
}
 
export default SettingsPage;