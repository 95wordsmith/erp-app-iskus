'use client'


import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ProductColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'



export const StaffClient= ({data}) =>{

  const router  = useRouter()
  const params = useParams()
  return (
    <>
  
    <DataTable searchKey='fullName' columns={columns} data={data}/>

    </>
  )
}