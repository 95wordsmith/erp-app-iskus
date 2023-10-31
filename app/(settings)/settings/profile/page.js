'use client'
import { useState } from "react";

const ProfilePage = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = async(e) => {
    e.preventDefault()
    const {fullName,email,phoneNumber,address,dateOfBirth,position} = formValues
    console.log(fullName)
    const response = await fetch('/api/profile',{
      method:'POST',
        "Content-Type": "application/json",
        body:JSON.stringify({fullName,email,phoneNumber,address,dateOfBirth,position})
    })
  };

  return (
    <>
      <h1>This is the profile page</h1>
      <form className="flex flex-col border-2">
        <input
          type="text"
          name="fullName"
          onChange={handleChange}
          value={formValues.fullName}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formValues.email}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={formValues.phoneNumber}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={formValues.address}
          placeholder="Address"
        />
        <input
          type="text"
          name="dateOfBirth"
          onChange={handleChange}
          value={formValues.dateOfBirth}
          placeholder="Date of Birth"
        />
        <input
          type="text"
          name="position"
          onChange={handleChange}
          value={formValues.position}
          placeholder="Position"
        />
        <button onClick={submitForm}>Submit</button>
      </form>
    </>
  );
};

export default ProfilePage;
