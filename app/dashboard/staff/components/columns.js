"use client"

import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"




export const columns= [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey:"role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey:"fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey:"email",
    header: 'Email'
  },
  {
    accessorKey:"position",
    header: 'Position'
  },
  {
    accessorKey:"address",
    header: 'Address'
  },
  {
    accessorKey:"phoneNumber",
    header: 'PhoneNumber'
  },
  {
    id:'actions',
    cell:({row})=><CellAction data={row.original}/>
  }
]
