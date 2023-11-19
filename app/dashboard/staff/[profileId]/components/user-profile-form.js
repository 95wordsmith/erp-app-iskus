"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Trash, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Button } from "@/components/ui/button";
const stringOrNumberSchema = z.custom((data) => {
  if (typeof data === "string" || typeof data === "number") {
    return data;
  } else {
    throw new Error("Invalid type. Must be a string or a number.");
  }
});

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  address: z.string().min(5, "Address must be at least 8 characters long"),
  phoneNumber: stringOrNumberSchema,
  position: z.string().min(1, "Position must be at least 5 characters long"),
});

const UserProfileForm = ({ intialData }) => {
  const { profileId } = useParams();


  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = intialData ? "Update Profile" : "Add Profile";
  const description = intialData
    ? "Update Profile Details"
    : "Add Profle Details";

  const action = intialData ? "Save changes" : "Add";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: intialData || {
      fullName: "",
      email: "",
      address: "",
      position: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data) => {
    const { fullName, email, address, phoneNumber, position } = data;

    try {
      setLoading(true);
      if (intialData) {
        const response = await fetch(`/api/profile/${profileId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            address,
            phoneNumber,
            position,
          }),
        });
        const data = await response.json();
        toast({
          title: "Success",
          description: "Profile Details Updated Successfully!",
        });
      } else {
        const response = await fetch(`/api/profile/${profileId}/`,{cache:'no-store'} , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            address,
            phoneNumber,
            position,
          }),
        });
        toast({
          title: "Success",
          description: "Profile Details Created Successfully!",
        });
      }
      router.refresh();
      router.push(`/dashboard/staff`);
    } catch (error) {
      console.log(error.message);
      toast({
        title:'Error',
        description:'Something went wrong!',
        variant: 'destructive'
      })
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch (`/api/profile/${profileId}/`,{cache:'no-store'} , {
        method: "DELETE",
      });
      const data = await response.json();
      router.push(`/dashboard/staff`)

      toast({
        title:'Success',
        description:'Profile Details Deleted Successfully!',
      })
      router.refresh();

    } catch (error) {
      console.log(error.message)

      toast({
        title:'Error',
        description:'Something went wrong!',
        variant: 'destructive'
      })
    } finally {
         setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {intialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form asChild {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Address"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Position"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Phone number"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserProfileForm;
