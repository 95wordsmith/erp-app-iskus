import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DatePickerWithRange } from "./components/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Banknote, Hash } from "lucide-react";
import Barchart from "./components/barChart";
import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { Heading } from "@/components/ui/heading";
import { formattedCurrency } from "@/lib/utils";

import PieChartLayout from "./components/pieChart";
import getTypeData from "@/actions/getTypeData";

import RefreshButton from "./components/refresh";
export const revalidate = 0;
const DashboadPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const start = searchParams.start;
  const end = searchParams.end;

  const { graphData, totalRevenue } = await getGraphRevenue(start, end);
  const { longTermRevenue, longTermNumber, jobRevenue, jobNumber } =
    await getTypeData(start, end);

  const totalNumber =
    longTermNumber && jobNumber ? longTermNumber + jobNumber : 0;

  const ongoing = await prisma.projects.count({
    where: {
      status: "ONGOING",
    },
  });
  const pending = await prisma.projects.count({
    where: {
      status: "PENDING",
    },
  });
  const completed = await prisma.projects.count({
    where: {
      status: "COMPLETED",
    },
  });

  const status = [
    { name: "PENDING", value: pending, color: "#E3E540" },
    { name: "ONGOING", value: ongoing, color: "#325DDA" },
    { name: "COMPLETED", value: completed, color: "#3EBB28" },
  ];

  return (
    <div className=" px-6 md:px-10 lg:px-16 py-8 ">
      <div className=" sm:flex justify-between pb-3  border-b-2">
        <Heading
          title="Dashboard"
          description="Overview of your Company per date range."
        />
        <DatePickerWithRange />
      </div>
      <RefreshButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-10 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue ? formattedCurrency(totalRevenue) : 0}
            </div>
          </CardContent>
          <CardHeader className="flex mt-[-30px] flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobRevenue ? formattedCurrency(jobRevenue) : 0}
            </div>
          </CardContent>
          <CardHeader className="flex mt-[-30px] flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {longTermRevenue ? formattedCurrency(longTermRevenue) : 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Number</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalNumber ? totalNumber : 0}
            </div>
          </CardContent>
          <CardHeader className="flex mt-[-30px] flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobNumber ? jobNumber : 0}
            </div>
          </CardContent>
          <CardHeader className="flex mt-[-30px] flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {longTermNumber ? longTermNumber : 0}
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <PieChartLayout data={status} />
        </div>
      </div>
      <div className="my-6">
        <Barchart data={graphData} />
      </div>
    </div>
  );
};

export default DashboadPage;
