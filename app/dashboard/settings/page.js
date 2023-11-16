import { Heading } from "@/components/ui/heading";
import CreateUser from "./components/create-user";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, UserCog2 } from "lucide-react";
import Link from "next/link";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const username = session.user.username;
  const role = session.user.role;

  
  const id = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id:true,
      profile: {
        select: {
          id: true,
        },
      },
    },
  });
  
  // const {profile} =id
  const { profile } = id || { profile: null };


  const profileId =profile? profile.id:null
  const {id:user} =id

  const heading = profileId ?"Update Profile Details":"Add profile details"

  return (
    <>
      <div className="flex items-center justify-between px-10 py-6">
        <Heading title="Settings" description="Manage your user settings" />
        <Heading title={username} description={role} />
      </div>
      <Separator />
      <div className="px-10 py-4">
        <h1 className="text-xl font-bold pb-2 underline underline-offset-4">Create a User</h1>
        <CreateUser />
      </div>
      <Separator />

      <div className="px-10 py-4">
        <h1 className="text-xl font-bold pb-2 underline underline-offset-4 ">{heading}</h1>
        <Button variant='outline' className='ml-7' >
          {profileId?
          <Link href ={`/dashboard/staff/${profileId}`} >
          <UserCog2/>    
          </Link>
          : <Link href ={`/dashboard/staff/${user}`} >
          <User/>    
          </Link>}
        </Button>
      </div>
      <Separator />

    </>
  );
};

export default SettingsPage;
