"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { UserCircle2 } from "lucide-react";
import { UserCog2 } from "lucide-react";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { Button } from "./ui/button";

const UserProfile = () => {
  const { data: session } = useSession();
  const initials = session?.user?.username.slice(0, 2).toUpperCase();
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="border-b text-center text-sm">
            <p>{session?.user?.username}</p>
            <p className="text-[0.7rem] font-bold">{session?.user?.role}</p>
          </div>
          <div className="text-sm flex-col flex gap-2 mt-2" >
            <Link href="/">
              <div className="flex space-x-32 p-2  hover:bg-slate-200/40 rounded-lg shadow-sm">
                <UserCircle2 />
                <span> Profile</span>
              </div>
            </Link>
            <Link href="/settings/profile">
              <div className="flex space-x-32  p-2 hover:bg-slate-200/40 rounded-lg shadow-sm">
                <UserCog2 />
                <span> Settings</span>
              </div>
            </Link>
          </div>
          <div className="border-t flex justify-center ">
            <Button onClick={()=>signOut()} className='mt-2' variant='ghost'>Logout</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserProfile;
