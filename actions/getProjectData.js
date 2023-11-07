const getProjectData = async () => {

  const res = await fetch('/api/projects')
  const resData = await res.json()
  return resData;
  
 
};

export default getProjectData;