import {create} from 'zustand'


export const useChangePasswordModal=create((set)=>({
  isOpen:false,
  onOpen:()=>set({isOpen:true}),
  onClose:()=>set({isOpen:false})
}))