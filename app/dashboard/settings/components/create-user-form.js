"use client";
import { Button } from "@/components/ui/button";
import { useCreateUserModal } from "@/hooks/useCreateUserModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const roleOptions = ["SUPERADMIN", "ADMIN"];
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
  role: z.string().refine((value) => roleOptions.includes(value), {
    message: "Please select a valid role (SUPER ADMIN OR ADMIN).",
  }),
});

const CreateUserForm = () => {
  const [loading,setIsLoading] =useState(false)
  const router = useRouter()
  const { toast } = useToast();
  const accessControls = useCreateUserModal();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (values) => {
    const { username, password, role } = values;
    const trimmedUsername=username.trim()
    const trimmedPassword = password.trim()
   

    console.log(trimmedUsername,trimmedPassword,role)
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ username:trimmedUsername, password:trimmedPassword, role }),
      });
      accessControls.onClose();
      router.push(`/dashboard/staff`);
      router.refresh();
      toast({
        title: "Success",
        description: "User Created Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Wrong Username or Password",
        variant: "destructive",
      });
    }finally{
      setIsLoading(false)
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
                  <Input disabled={loading} placeholder="username" {...field} />
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
                  <Input  disabled={loading} type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Role"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                      <SelectItem value="ADMIN">Regular Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button  disabled={loading} className="mt-4" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateUserForm;
