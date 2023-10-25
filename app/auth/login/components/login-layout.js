"use client";

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import { cn } from "@/lib/utils";

const LoginLayout = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-screen ">
        <Card className={cn("w-[500px] ")}>
          <CardHeader>
            <CardTitle className='text-center'>Sign In To Your Portal</CardTitle>
            <CardDescription className='text-center'>
              Only authorized users are allowed access. Contact your
              adminstrator if you have issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
      </Card>
      </div>
    </>
  );
};

export default LoginLayout;
