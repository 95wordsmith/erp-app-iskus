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

const formSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must include at least one uppercase letter",
    }),
});

const ChangePasswordForm = () => {
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const accessControls = useCreateUserModal();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values) => {
    const { oldPassword, newPassword } = values;

    setIsLoading(true);
    try {
      const response = await fetch("/api/change-password/", {
        method: "PATCH",
        "Content-Type": "application/json",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (response.ok) {
        accessControls.onClose();

        toast({
          title: "Success",
          description: "Password Changed Successfully",
        });
      }else{
        toast({
          title: "Error",
          description: "Password does not match!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
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
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="mt-4" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
