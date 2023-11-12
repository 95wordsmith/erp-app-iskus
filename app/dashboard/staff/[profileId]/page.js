// import StaffProfile from "./components/user-profile";
// const ProfileDetails = () => {

//   return (
//     <>
//     <StaffProfile/>
//     </>
//    );
// }
// export default ProfileDetails;
import { convertData } from "@/actions/getStaffData";
import prisma from "@/lib/prisma";
import UserProfileForm from "./components/user-profile-form";
// import { ProjectForm } from "./components/projectForm";

function convertProfiledata(data) {
  const { profile } = data;
  return profile;
}
const StaffCreateOrUpdate = async ({ params }) => {
  const { profileId } = params;
  const profileData = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
   
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        address: true,
        position: true,
      },
  
  });
console.log(profileData)
  // const profile = profileData? convertProfiledata(profileData):null

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UserProfileForm intialData={profileData}/>
        </div>
      </div>
    </>
  );
};

export default StaffCreateOrUpdate;
