'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const StaffProfile = () => {
  const {profileId} = useParams()

const [data,setData]=useState()

  useEffect(() => {
    const getProfileData = async () => {
      const response = await fetch(`/api/profile/${profileId}`);

      const {profileData} = await response.json();
      console.log(profileData);
      setData(profileData)
    };
    getProfileData();
  }, []);
if(!data){
  return null
}

  return ( 
  <>
  <div className="text-center p-5">
    <h1>{data.fullName}</h1>
    <h1>{data.email}</h1>
    <h1>{data.address}</h1>
    <h1>{data.position}</h1>
    <h1>{data.dateOfBirth}</h1>
    <h1>{data.phoneNumber}</h1>
    </div>
  </>
   );
}
 
export default StaffProfile;