import React, { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LogoSl from "../../assets/logo/logosl.svg";
import "./logo.css";
import Button from "../../layouts/Landing/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };
  // const handleRegister = () => {
  //   navigate("/register");
  // };

  return (
    <div className="top-0 fixed w-full z-10 bg-transparent">
      <div>
        <div className="flex flex-row p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-filter backdrop-blur-lg">
          <div className="flex flex-row items-center cursor-pointer gap-0 navbar-container">
            <img
              src={LogoSl}
              alt="Skanic Library Logo"
              className="logo-container md-5"
            />
            <div className="md:mt-0 mb-3 md-5">
              <Link
                to="/"
                className=" font-semibold text-2xl cursor-pointer text-brightGreen flex mt-5"
              >
                SKANIC LIBRARY
              </Link>
            </div>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8 pl-52">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Beranda
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brightGreen transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Tentang
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brightGreen transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
            <Link
              to="service"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Layanan
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brightGreen transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
            <Link
              to="librarian"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Pustakawan
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brightGreen transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Kontak
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brightGreen transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center justify-end gap-4 ml-48">
            <Button title="Masuk" onClick={handleLogin} />
            {/* <Button title="Daftar" onClick={handleRegister} /> */}
          </div>

          <div className="hidden lg:flex"></div>

          <div className="md:hidden flex items-center pl-36">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`absolute bg-opacity-50 backdrop-filter backdrop-blur-lg ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col left-0 top-21 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Beranda
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Tentang
          </Link>
          <Link
            to="service"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Layanan
          </Link>
          <Link
            to="librarian"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Pustakawan
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Kontak
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
