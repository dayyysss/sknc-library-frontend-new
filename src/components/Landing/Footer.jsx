import React from "react";
import { Link } from "react-scroll";
import Logo from '../../assets/logo/logosl.svg'

const Footer = () => {
  return (
    <div>
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

      </div>
      <div className="flex flex-col md:flex-row justify-between bg-white border-2 border-lightText rounded-lg md:px-32 p-5">
        <div className="flex flex-col md:flex-row gap-5 font-medium p-1 text-lg mt-7">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Tentang
          </Link>
          <Link
            to="service"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Layanan
          </Link>
          <Link
            to="librarian"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Pustakawan
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Kontak
          </Link>
        </div>
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src={Logo} alt="Skanic Library" className="w-24 h-24 text-white p-2 rounded-full" />
            <span className="ml-3 text-xl">Skanic Library</span>
          </a>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.43617804818757!2d106.7584925349182!3d-6.585920900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5457e0e3bcf%3A0x58481d58737539c0!2sSMK%20Negeri%201%20Ciomas!5e0!3m2!1sid!2sid!4v1721928072787!5m2!1sid!2sid" 
          width="400"
          height="100"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"></iframe>
      </div>
      <div className="text-center mt-4 mb-4">
        <p>
          &copy; developed by
          <span className="text-brightGreen px-2">incredible inc</span>|
          All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
