"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTableEx } from "@/components/data-table-extra";
import { useRouter } from "next/navigation";

export const ProjectClient = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <Button onClick={() => router.push('/dashboard/projects/new')}>
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </Button>
      <DataTableEx columns={columns} data={data} />
    </>
  );
};
