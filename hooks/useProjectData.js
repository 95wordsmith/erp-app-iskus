import getProjectData from "@/actions/getProjectData"

const { useEffect, useState } = require("react")



export const useProjectData =()=>{

  const [projectData,setProjectData]=useState()
  
  useEffect(()=>{
    const projectData= async()=>{
      const profile =await getProjectData()
      setProjectData(profile)
    }
    projectData()
  },[])

  return projectData

}
