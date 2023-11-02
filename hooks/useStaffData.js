const { default: getStaffData } = require("@/actions/getStaffData")
const { useEffect, useState } = require("react")



export const useStaffData =()=>{

  const [profileData,setProfileData]=useState()
  
  useEffect(()=>{
    const staffData= async()=>{
      const profile =await getStaffData()
      setProfileData(profile)
    }
    staffData()
  },[])

  return profileData

}
