"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must include at least one uppercase letter",
    }),
});

const LoginForm = () => {
const searchParams = useSearchParams()

  const initalData ={
    username: searchParams.get('username'),
    password: searchParams.get("password")
  }
  


  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initalData.username?initalData:{
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const loginData = await signIn("credentials", {
      username: trimmedUsername,
      password: trimmedPassword,
      redirect: false,
      callbackUrl: "/auth/login",
    });

    if (loginData?.error) {
      console.log(loginData.error);
      toast({
        title: "Error",
        description: "Wrong Username or Password",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "You have logged in successfully",
      });
      router.push("/");
    }
  };

  return (
    <>
      <Form asChild {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
