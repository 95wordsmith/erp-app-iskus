"use client"

import { CellAction } from "./cell-action"





export const columns= [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey:"fullName",
    header: 'Full Name'
  },
  {
    accessorKey:"role",
    header: 'Role'
  },
  {
    accessorKey:"position",
    header: 'Position'
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
