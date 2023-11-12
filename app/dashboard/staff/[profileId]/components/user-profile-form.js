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
  if (typeof data === 'string' || typeof data === 'number') {
    return data;
  } else {
    throw new Error('Invalid type. Must be a string or a number.');
  }
});

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  address: z.string().min(5, "Address must be at least 8 characters long"),
  phoneNumber: stringOrNumberSchema,
  position: z.string().min(5, "Position must be at least 5 characters long"),
});

const UserProfileForm = ({ intialData }) => {
 
  const { profileId } = useParams();
  // console.log('this is actually the userId',profileId)

  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = intialData ? "Update Profile" : "Add Profile";
  const description = intialData
    ? "Update Profile Details"
    : "Add Profle Details";
  const toastMessage = intialData ? "Billboard updated" : "Billboard created";
  const action = intialData ? "Save changes" : "Create";


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: intialData|| {
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
      // setLoading(true)
   
      if(intialData){

        const response = await fetch(`/api/profile/${profileId}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName,email,address,phoneNumber,position }),
        });
    const data = await response.json();
      router.push(`/dashboard/staff`);
      }else{
        try {
          const response = await fetch (`/api/profile/${profileId}`,{
            method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body: JSON.stringify({
                fullName,
                email,
                address,
                phoneNumber,
                position,
              }),
          })
          // router.push(`/dashboard/staff`);
          
        } catch (error) {
          console.log(error.message)
        }

        // if(response.ok){
        //   alert('success')
        // }else{
        //   throw new Error('Something went wrong!');
        // }
      }
      } catch (error) {
        console.log(error.message)
      }
    // const { fullName, email, address, phoneNumber, position } = values;
    // const formmatedDate = format(dateOfBirth, "PPP");
    // console.log(fullName, email, formmatedDate, address, phoneNumber, position);

    // const response = await fetch(`/api/profile/${profileId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     fullName,
    //     email,
    //     formmatedDate,
    //     address,
    //     phoneNumber,
    //     position,
    //   }),
    // });
    // const data = await response.json();

    // const loginData = await signIn("credentials", {
    //   username: username,
    //   password: password,
    //   redirect: false,

    // });

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
const onDelete =()=>{

}
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
                    <Input placeholder="Full Name" {...field} />
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
                    <Input type="email" placeholder="email" {...field} />
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
                    <Input type="text" placeholder="Address" {...field} />
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
                    <Input type="text" placeholder="Position" {...field} />
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
                    <Input type="text" placeholder="Phone number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
</div>
            <Button className="ml-auto" type="submit">
              Submit
            </Button>
          </form>
        </Form>
   
    </>
  );
};

export default UserProfileForm;
