"use client";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import logo from "../../public/static/images/Logo.png";
import Image from "next/image";

function Header() {
  return (
    <>
      <div className="w-full  bg-darkBlue">
        <div className="container mx-auto flex items-center gap-x-3 p-3 justify-end text-white">
          <button>Register</button> | <button>Login</button>
        </div>
      </div>
      <div className="w-full bg-blue p-5">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div >
            <Link href="/">
              <Image loading="lazy" src={logo} alt="home" />
            </Link>
          </div>
          <div className="xl:flex hidden items-center gap-5 text-lg ">
            <Link href="/#">Outdoor Facilities</Link>
            <Link href="/#">Equipmenty</Link>
            <Link href="/#">Cunstruction</Link>
            <Link href="/#">Carpentry</Link>
            <Link href="/#">Occupation</Link>
            <Link href="/#">Distribution</Link>
            <Link href="/#">Finishes</Link>
            <button className="uppercase p-3 border rounded-lg">
              subscribe
            </button>
            <AiOutlineSearch role="button" className="h-10 w-10 text-white" />
          </div>
          <RiMenu3Line role="button" className="h-6 w-6 xl:hidden block" />
        </div>
      </div>
    </>
  );
}

export default Header;
