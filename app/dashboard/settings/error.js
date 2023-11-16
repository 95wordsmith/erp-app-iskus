'use client'
import { Button } from "@/components/ui/button";


const SettingsError = ({error,reset}) => {


  return (
    <div className="h-screen gap-4  bg-black/70 text-red-500 text-center  flex flex-col justify-center items-center">
      <h1 className="text-7xl ">There was a problem </h1>
      <h2  className="text-xl"  >{error.message||'Something went Wrong'}</h2>
      <Button variant='secondary' onClick={reset} >
     Try Again
      </Button>
    </div>
  );
};

export default SettingsError;