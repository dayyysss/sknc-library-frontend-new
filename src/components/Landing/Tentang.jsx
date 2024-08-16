import React from "react";
import img from "../../assets/images/about1.svg";
import Heading from "../../layouts/Landing/Heading";
import { Link } from "react-scroll";

const Tentang = () => {
  return (
    <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 md:mx-32 mx-5 mt-14 md:mt-24">
      {/* Gambar */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="img" className="w-full h-auto" />
      </div>

      {/* Konten Teks */}
      <div className="w-full md:w-1/2 text-center md:text-center space-y-6">
        <Heading title1="Kami Adalah" title2="Skanic Library" />
        <p className="text-lightText leading-relaxed">
          Skanic Library adalah sumber utama bagi para pecinta buku yang mencari
          kemudahan dalam peminjaman, pengembalian, dan penanganan denda. Kami
          menyediakan layanan sirkulasi yang efisien untuk memastikan pengalaman
          yang nyaman bagi setiap anggota. Bergabunglah dengan kami dan nikmati
          kemudahan dalam mengelola koleksi literasi Anda.
        </p>
      </div>
    </div>
  );
};

export default Tentang;
