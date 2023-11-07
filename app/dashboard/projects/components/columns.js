"use client"

import { format } from "date-fns"
import { CellAction } from "./cell-action"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"




export const columns= [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey:"type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey:"customer",
    header: 'Customer'
  },
  {
    accessorKey:"status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const status = row.getValue("status")
      const bgStatusColor = status === 'PENDING'? 'bg-yellow-400':status ==='ONGOING'?'bg-blue-400': 'bg-green-400' 
    return <div className={`text-center font-semibold text-black/70 py-2 rounded-lg ${bgStatusColor}`}>{status}</div>
    }
  },
  {
    accessorKey:"amountTotal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const amount = parseFloat(row.getValue("amountTotal"))
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
    }).format(amount);
    return <div className=" font-medium">{formatted}</div>
    }
  },
  {
    accessorKey:"createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const date= new Date(row.getValue('createdAt'))
      const date2 = format(date,'PPP')
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{date2}</div>
    }
  },
  {
    id:'actions',
    cell:({row})=><CellAction data={row.original}/>
  }
]
