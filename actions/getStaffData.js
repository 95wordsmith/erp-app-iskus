
export function convertData(data) {
  const convertedData = [];

  data.forEach(item => {
    const {
      id,
      username,
      role,
      profile,
    } = item;

    const convertedItem = {
      id,
      username,
      role,
      profileId: (profile && profile.id) || null,
      fullName: (profile && profile.fullName) || null,
      email: (profile && profile.email) || null,
      phoneNumber: (profile && profile.phoneNumber) || null,
      address: (profile && profile.address) || null,
      position: (profile && profile.position) || null,
    };

    convertedData.push(convertedItem);
  });

  return convertedData;
}


