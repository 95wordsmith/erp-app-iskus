"use client";
import { useParams } from "next/navigation";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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


const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .email()
    ,
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  address: z
  .string()
  .min(5, "Address must be at least 8 characters long")
  ,
  phoneNumber: z
  .string()
  .min(5, "Address must be at least 5 characters long")
  ,
  position: z
  .string()
  .min(5, "Position must be at least 5 characters long")
  ,
});

const AddUserDetailsForm = () => {
const {id}=useParams()



  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: new Date(),
      address: "",
      position:"",
      phoneNumber: ""
    },
  });




  const onSubmit = async (values) => {
    // console.log(values)
  const {fullName,email ,dateOfBirth,address,phoneNumber,position} = values
  const formmatedDate= format(dateOfBirth, 'PPP')
  console.log(fullName,email,formmatedDate,address,phoneNumber,position)

  const response = await fetch(`/api/profile/adddetails/${id}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName,email,formmatedDate,address,phoneNumber,position }),
  });
  const data = await response.json();
  
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

  return (
    <>
      <div className="w-[800px] mx-auto mt-24" >
        <Form asChild {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
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
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value,  'PPP')

                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

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

  
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddUserDetailsForm;
