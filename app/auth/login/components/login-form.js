"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const guestLogin = async () => {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        username: "guest",
        password: "Password123",
        redirect: false,
        callbackUrl: "/auth/login",
      });

      if (loginData?.error) {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Logged in as guest",
        });
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        username: trimmedUsername,
        password: trimmedPassword,
        redirect: false,
        callbackUrl: "/auth/login",
      });

      if (loginData?.error) {
        toast({
          title: "Error",
          description: "Wrong Username or Password",
          variant: "destructive",
        });
      } else {
        setLoading(true);

        toast({
          title: "Success!",
          description: "You have logged in successfully",
        });
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button disabled={loading} onClick={guestLogin} className="w-full">
        Login as Guest
      </Button>
      {!open && (
        <Button disabled={loading} onClick={() => setOpen(true)} className="w-full my-3">
          Login with Credentials
        </Button>
      )}

      {open && (
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

            <Button disabled={loading} className="mt-4" type="submit">
              Login
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
