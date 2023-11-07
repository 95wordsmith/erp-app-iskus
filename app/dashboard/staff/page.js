'use client'

import { useStaffData } from "@/hooks/useStaffData";
import { StaffClient } from "./components/client";






const StaffPage = () => {

  
    const profileData = useStaffData()
    if(!profileData){
      return null
    }
  

  return ( 
  <>
  <div className="border-b text-center p-6 ">
    <h1 className="text-4xl">Staff Strength: {profileData.length}</h1>
    <p>Click on the action options to view and make changes to your profile info. </p>
    <p className=" text-sm text-red-400">Only Users with SUPERADMIN access can delete or modify profile data of other staff</p>

  </div>
 

   
  <div className=" flex  justify-center ">
 <StaffClient  data={profileData}/>
  </div>
  </> 
  );
}
 
export default StaffPage;