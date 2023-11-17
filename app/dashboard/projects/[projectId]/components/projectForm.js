"use client";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/ui/modals/alert-modal";
const stringOrFileSchema = z.custom((data) => {
  if (typeof data === "string" || data instanceof File) {
    return data;
  } else {
    throw new Error("Invalid type. Must be a string or a File.");
  }
});

const stringOrNumberSchema = z.custom((data) => {
  if (typeof data === "string" || typeof data === "number") {
    return data;
  } else {
    throw new Error("Invalid type. Must be a string or a number.");
  }
});

const formSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  pinNum: z.string().min(1),
  location: z.string().min(1),
  invoiceUrl: z.any(),
  date: z.date(),
  amountTotal: stringOrNumberSchema,
  customer: z.string().min(1),
});

export const ProjectForm = ({ intialData }) => {
  const { invoiceUrl, ...data } = intialData || {};

  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const { projectId } = params;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = intialData ? "Update Project " : "Create Project";
  const description = intialData
    ? "Update Project Details"
    : "Create a New Project";
  const action = intialData ? "Save changes" : "Create";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      title: "",
      type: "",
      status: "",
      pinNum: "",
      location: "",
      invoiceUrl: "",
      date: new Date(),
      amountTotal: 0,
      customer: "",
    },
  });

  const onSubmit = async (data) => {
   
    setLoading(true);
    const { invoiceUrl, ...restData } = data;

    const passedData = invoiceUrl ? data : restData;

    try {
      if (invoiceUrl) {
        const fileRef = ref(storage, `invoices/${invoiceUrl.name + v4()}`);
        const uploadTask = await uploadBytes(fileRef, invoiceUrl);
        const snapshot = await getDownloadURL(uploadTask.ref);
        data.invoiceUrl = snapshot;
      }
      if (intialData) {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passedData),
        });
        toast({
          title: "Success",
          description: "Project Details Updated Successfully!",
        });
      } else {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast({
          title: "Success",
          description: "Project Details Created Successfully!",
        });
      }
      router.refresh();
      router.push(`/dashboard/projects`);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      router.push(`/dashboard/projects`);

      toast({
        title: "Success",
        description: "Project Deleted Successfully!",
      });
    } catch (error) {
      console.log(error.message);

      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
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
      <Form {...form}>
        <form
          className="space-y-8  w-full "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Project Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="title"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
                            placeholder="Select The Type Project"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LONGTERM">LONGTERM</SelectItem>
                        <SelectItem value="JOB">JOB</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="type"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
                            placeholder="Select The Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="ONGOING">ONGOING</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="status"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Pin Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="pinNum"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="customer"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="location"
              control={form.control}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={cn("mb-2")}>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={loading}
                          variant={"outline"}
                          className={cn(
                            " h-10 w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Total Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="amountTotal"
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Upload</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Upload your invoice"
                      type="file"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              name="invoiceUrl"
              control={form.control}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
