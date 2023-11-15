import Image from "next/image";
import logo from '../app/assets/iskus.jpg'
import MainNav from "./MainNav";
import UserProfile from "./UserProfile";
const Navbar = () => {
  return (
     <>
     <div className="border-b">
      <div className="h-16 flex items-center justify-evenly px-4 ">
    <Image className="z-1" src={logo} alt="iskus" width={80} height={80} />
    <MainNav className="mx-6"/>
    <UserProfile/>
      </div>
     </div>
  
  </> 
  );
}
 
export default Navbar;