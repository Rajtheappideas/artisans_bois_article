"use client";
import Link from "next/link";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import logo from "../../public/static/images/Logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowSizes, setWindowSizes] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setShowSidebar(false);
      }
      setWindowSizes({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { name: "Outdoor Facilities", link: "/" },
    { name: "Equipmenty", link: "/" },
    { name: "Cunstruction", link: "/" },
    { name: "Carpentry", link: "/" },
    { name: "Occupation", link: "/" },
    { name: "Distribution", link: "/" },
    { name: "Finishes", link: "/" },
  ];

  return (
    <>
      <div className="w-full  bg-darkBlue">
        <div className="container mx-auto flex items-center gap-x-3 p-3 justify-end text-white">
          <button>Register</button> | <button>Login</button>
        </div>
      </div>
      {/* desktop menu */}
      <div className="w-full bg-blue p-5">
        <div className="container mx-auto flex justify-between items-center text-white">
          {/* home link */}
          <div>
            <Link href="/">
              <Image loading="lazy" src={logo} alt="home" />
            </Link>
          </div>
          {/* other links */}
          <div className="xl:flex hidden items-center gap-5 text-lg ">
            {links.map(({ link, name }, i) => (
              <Link key={i} href={link}>
                {name}
              </Link>
            ))}
            <button className="uppercase p-3 border rounded-lg">
              subscribe
            </button>
            <AiOutlineSearch role="button" className="h-10 w-10 text-white" />
          </div>
          {/* sidebar button */}
          <RiMenu3Line
            onClick={() => setShowSidebar(true)}
            role="button"
            className="h-6 w-6 xl:hidden block"
          />
        </div>
      </div>
      {/* mobile sidebar */}
      <div
        className={`w-full fixed inset-0 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <ul className="bg-white w-2/3 h-full flex items-center flex-col gap-5 justify-center absolute top-0 left-0 z-50">
          <AiOutlineClose
            role="button"
            onClick={() => setShowSidebar(false)}
            className="absolute top-3 right-3 z-50 h-6 w-6"
          />
          {links.map(({ link, name }, i) => (
            <li
              key={i}
              className="group w-full text-center relative z-10 capitalize md:text-lg hover:font-semibold transition-all duration-300 ease-in-out"
            >
              <Link href={link} className="text-center">
                {name}
              </Link>
              <p className="w-0 p-0 absolute top-0 left-0 -z-10 group-hover:w-full group-hover:p-4  duration-300 ease-in-out bg-blue/10"></p>
            </li>
          ))}
        </ul>
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed w-screen h-screen bg-black/20 inset-0 backdrop-blur-md z-20 -translate-x-10 `}
        ></div>
      </div>
    </>
  );
}

export default Header;
