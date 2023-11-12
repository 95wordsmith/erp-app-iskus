'use client'

import {  columns } from './columns'
import { DataTable } from '@/components/ui/data-table'



export const StaffClient= ({data}) =>{


  return (
    <>
  
    <DataTable searchKey='fullName' columns={columns} data={data}/>

    </>
  )
}