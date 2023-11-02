
function convertData(data) {
  // Initialize an empty array to store the converted data
  const convertedData = [];

  // Iterate through the "profileData" array
  data.forEach(item => {
    // Extract properties from the current item
    const {
      id,
      username,
      role,
      profile: { id: profileId, fullName, email, phoneNumber, position },
    } = item;

    // Create a new object with the desired properties
    const convertedItem = {
      id,
      username,
      role,
      profileId,
      fullName,
      email,
      phoneNumber,
      position,
    };

    // Push the converted item into the result array
    convertedData.push(convertedItem);
  });

  return convertedData;
}




const getStaffData = async () => {

  const res = await fetch('/api/profile')
  const resData = await res.json()
  const {profileData}=resData
  return convertData(profileData);
 
};

export default getStaffData;