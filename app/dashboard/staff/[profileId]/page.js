
import prisma from "@/lib/prisma";
import UserProfileForm from "./components/user-profile-form";


export const revalidate =0
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
