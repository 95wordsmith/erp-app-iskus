const getProjectDetails = async (params) => {

  const res = await fetch(`/api/projects/${params}`)
  const resData = await res.json()
return resData;
   
};

export default getProjectDetails