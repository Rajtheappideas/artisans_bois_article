"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../public/static/images/Logo.png'

const Footer = () => {
  return (
    <footer className="w-full text-white relative">
      {/* subscribe div */}
      <div className="w-11/12 absolute flex gap-3 items-center lg:flex-row flex-col justify-between xl:-top-20 lg:-top-24 md:-top-20 -top-24 xl:p-10 md:p-5 p-3 rounded-lg left-1/2 xl:container mx-auto -translate-x-1/2 bg-[#003F7A] border-white text-white text-center">
        <div className="md:space-y-3 lg:w-1/2 w-full text-left">
          <p className="md:text-3xl text-lg font-semibold">
            SUBSCRIBE TO OUR NEWSLETTER
          </p>
          <p>Sign up to receive email updates</p>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4 lg:w-1/2 w-full justify-end">
          <input
            type="text"
            name="email"
            required
            placeholder="Enter your email"
            className="lg:w-1/2 w-full p-3 text-black outline-none"
          />
          <button className="uppercase text-center md:w-1/3 w-full bg-blue p-3 transition-all ease-in-out duration-200 hover:bg-darkBlue active:scale-90">
            subscribe
          </button>
        </div>
      </div>
      {/* main footer */}
      <div className="w-full bg-blue xl:pt-20 lg:pt-28 pt-32">
        <div className="container grid md:p-10 p-5 place-items-start items-start xl:grid-cols-4  md:grid-cols-2 w-full md:gap-5 gap-8 mx-auto">
          <div className="md:text-4xl text-2xl w-full">
            <Image
              loading="lazy"
              src={logo}
              alt=""
            />
          </div>
          {/* wood network */}
          <div className="space-y-3 w-full">
            <p className="uppercase md:text-2xl text-xl underline-offset-8 underline">
              Wood network
            </p>
            <ul className="md:space-y-3 space-y-1">
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">wood news media</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">wood mag</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">eshop</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">the magazine designer</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">roofing magazine</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">wood parteners</Link>
              </li>
            </ul>
          </div>
          {/* last articles */}
          <div className="space-y-3 w-full">
            <p className="uppercase md:text-2xl text-xl underline-offset-8 underline">
              Last Articles
            </p>
            <ul className="md:space-y-3 space-y-1">
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">Bathroom floor coverings from MEISTER</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">A rtibat unveils its new products</Link>
              </li>
              <li className="hover:pl-3 hover:border-l-8 capitalize border-white cursor-pointer transition-all duration-200 ease-in-out text-left">
                <Link href="/">Artibat returns to Rennes</Link>
              </li>
            </ul>
          </div>
          {/* social media */}
          <div className="space-y-3">
            <p className="uppercase  md:text-2xl text-xl underline-offset-8 underline">
              Social media
            </p>
            <div className=" flex items-center gap-4">
              <FaFacebookF
                role="button"
                className="md:p-3 p-2 md:h-14 md:w-14 h-10 w-10 rounded-full bg-white text-blue"
              />
              <FaXTwitter
                role="button"
                className="md:p-3 p-2 md:h-14 md:w-14 h-10 w-10 rounded-full bg-white text-blue"
              />
              <FaInstagram
                role="button"
                className="md:p-3 p-2 md:h-14 md:w-14 h-10 w-10 rounded-full bg-white text-blue"
              />
            </div>
          </div>
        </div>
      </div>
      {/* bottom div */}
      <div className="w-full bg-darkBlue text-center">
        <div className="w-full container mx-auto p-3">
          Copyright © {new Date().getFullYear()} ArtisansBois
        </div>
      </div>
    </footer>
  );
};

export default Footer;
