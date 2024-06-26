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
              Login as guest or provide your credentials
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
