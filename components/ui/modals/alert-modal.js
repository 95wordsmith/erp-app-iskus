'use client'

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "../button";



export const AlertModal =({
  isOpen,
  onClose,
  onConfirm,
  loading
})=>{
  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  return (
    <Modal title='Are you sure?' description="This action cannot be undone." isOpen={isOpen} onClose ={onClose}>
      <div className="pt-6 space-x-2 items-center justify-end w-full">
        <Button disabled={loading} variant='outline' onClick={onClose}>Cancel</Button>
        <Button disabled={loading} onClick={onConfirm} variant='destructive'>Continue</Button>
      </div>
    </Modal>
  )
}