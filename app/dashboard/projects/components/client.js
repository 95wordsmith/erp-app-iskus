'use client'


import { columns } from './columns'
import { DataTableEx } from '@/components/data-table-extra'



export const ProjectClient= ({data}) =>{


  return (
    <>

    <DataTableEx columns={columns} data={data}/>
  

    </>
  )
}