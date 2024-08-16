import React from "react";
import { Link } from "react-scroll";
import Logo from '../../assets/logo/logosl.svg';

const Footer = () => {
  return (
    <section className="pt-16 pb-10 md:pt-40 md:pb-10 bg-gray-100">
      <div className="container mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center border-slate-600 border-b-2 pb-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src={Logo} alt="Skanic Library" className="w-24 h-24 md:w-40 md:h-40 rounded-full" />
            <span className="text-xl md:text-2xl font-semibold text-[#539165] mt-4">Skanic Library</span>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
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

          <div className="w-full h-56 md:h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.43617804818757!2d106.7584925349182!3d-6.585920900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5457e0e3bcf%3A0x58481d58737539c0!2sSMK%20Negeri%201%20Ciomas!5e0!3m2!1sid!2sid!4v1721928072787!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-700">
          &copy; developed by
          <span className="text-[#539165] px-2">incredible inc</span>|
          All rights reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
