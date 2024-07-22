import React from "react";
import img from "../../assets/images/hero.svg";
import Button from "../../layouts/Landing/Button";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();

  const handleCariBukuClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-24">
      <div className="md:w-2/4 text-center">
        <h2 className="text-5xl font-semibold leading-tight">
          Selamat Datang Di <br />
          <span className="text-brightGreen"> Skanic Library</span>
        </h2>
        <p className="text-lightText mt-5 m-6 text-center">
          Temukan kemudahan dalam meminjam dan mengembalikan buku di Skanic
          Library! Jelajahi koleksi kami dan nikmati proses yang cepat dan
          praktis. Dapatkan pengalaman membaca yang menyenangkan dan memperluas
          wawasan Anda dengan Skanic Library.
        </p>

        <Button title="Cari Buku" onClick={handleCariBukuClick} />
      </div>

      <div className="w-full md:w-2/4">
        <img src={img} alt="img" className="mt-10" />
      </div>
    </div>
  );
};

export default Beranda;
