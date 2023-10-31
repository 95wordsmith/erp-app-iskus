"use client";
import { signIn } from "next-auth/react";
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const roleOptions = ['SUPERADMIN','ADMIN'];
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
    message: 'Please select a valid role (SUPER ADMIN OR ADMIN).',
  })
});

const CreateUserForm = () => {
  const {toast} = useToast()
  const accessControls = useCreateUserModal()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role:""
    },
  });

  const onSubmit = async (values) => {
    // console.log(values)
    const { username, password,role } = values;

  

    try {
      const response = await fetch('/api/user',{
        method:'POST',
          "Content-Type": "application/json",
          body:JSON.stringify({username,password,role})
      })
      accessControls.onClose()
      toast({
        title:'Success',
        description:'User Created Successfully',
      })
    } catch (error) {
      console.log(error)
      toast({
        title:'Error',
        description:'Wrong Username or Password',
        variant: 'destructive'
      })
    }
    

    // const loginData = await signIn("credentials", {
    //   username: username,
    //   password: password,
    //   redirect: false,
    //   // callbackUrl:'/'
    // });
    // // console.log(loginData)
    // if (loginData?.error) {
    //   console.log(loginData.error);
    //   toast({
    //     title:'Error',
    //     description:'Wrong Username or Password',
    //     variant: 'destructive'
    //   })
    // } else {
    //   toast({
    //     title:'Success!',
    //     description:'You have logged in successfully'
    //   })
    //   router.push("/");
    // }
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

          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    // disabled={loading}
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
          <Button className="mt-4" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateUserForm;