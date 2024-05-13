"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTableEx } from "@/components/data-table-extra";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import DownloadExcel from "../../components/downloadExcel";

export const ProjectClient = ({ data }) => {
  const router = useRouter()
  return (
    <>
    <div className="flex justify-between">
      <Button onClick={() => router.push('/dashboard/projects/new')}>
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </Button>
      <DownloadExcel data={data} type='project'/>

    </div>

      <DataTable searchKey='title' columns={columns} data={data} />
    </>
  );
};
