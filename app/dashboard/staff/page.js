import prisma from "@/lib/prisma";

import { StaffClient } from "./components/client";
import { convertData } from "@/actions/getStaffData";
import DownloadExcel from "../components/downloadExcel";
export const revalidate = 0
const StaffPage = async () => {
  const profileData = await prisma.user.findMany({
    select:{
      id:true,
      username:true,
      role:true,
      profile:{
        select:{
          id:true,
          fullName: true,
          email: true,
          phoneNumber: true,
          address:true,
          position:true
        }

      }
    }
  })
  const profileDetails = convertData(profileData);

  


  return (
    <>
      <div className="border-b text-center p-6 ">
        <h1 className="text-4xl">Staff Strength: {profileDetails.length}</h1>
        <p>
          Click on the action options to view and make changes to your profile
          info.{" "}
        </p>
        <p className=" text-sm text-red-400">
          Only Users with SUPERADMIN access can delete or modify profile data of
          other staff
        </p>
      </div>
      <div className="  container">
        <div className="pt-4 flex justify-end">

<DownloadExcel data={profileDetails} type='staff'/>
        </div>
        <StaffClient data={profileDetails} />
      </div>
    </>
  );
};

export default StaffPage;
