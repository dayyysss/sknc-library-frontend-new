import React from "react";
import img from "../../assets/images/about1.svg";
import Heading from "../../layouts/Landing/Heading";
import { Link } from "react-scroll";

const Tentang = () => {
  return (
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="Kami Adalah" title2="Skanic Library" />
        <p className=" text-lightText">
          Skanic Library adalah sumber utama bagi para pecinta buku yang mencari
          kemudahan dalam peminjaman, pengembalian, dan penanganan denda. Kami
          menyediakan layanan sirkulasi yang efisien untuk memastikan pengalaman
          yang nyaman bagi setiap anggota. Bergabunglah dengan kami dan nikmati
          kemudahan dalam mengelola koleksi literasi Anda.
        </p>

        <Link to="contact" spy={true} smooth={true} duration={500}></Link>
      </div>
    </div>
  );
};

export default Tentang;
