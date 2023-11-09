// import getProjectData from "@/actions/getProjectData"

// const { useEffect, useState } = require("react")



// export const useProjectData =()=>{

//   const [projectData,setProjectData]=useState()
  
//   useEffect(()=>{
//     const projectData= async()=>{
//       const profile =await getProjectData()
//       setProjectData(profile)
//     }
//     projectData()
//   },[])

//   return projectData

// }

import { useEffect, useState, useMemo } from "react";
import getProjectData from "@/actions/getProjectData";

export const useProjectData = () => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectData();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (!projectData) {
      fetchData();
    }
  }, []);

  return useMemo(() => projectData, [projectData]);
};