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
    <div className="min-h-[80vh] flex flex-col md:flex-row md:justify-between items-center md:mx-auto mx-5 mt-24 md:mt-24 max-w-screen-lg lg:max-w-screen-xl">
      <div className="md:w-2/4 text-center md:text-center">
        <h2 className="text-4xl mt-10 text-center md:text-5xl font-semibold leading-tight md:text-center">
          Selamat Datang Di <br />
          <span className="text-brightGreen"> Skanic Library</span>
        </h2>
        <p className="text-lightText mt-5 mb-5 mx-6 md:mx-0 text-center md:text-center">
          Temukan kemudahan dalam meminjam dan mengembalikan buku di Skanic
          Library! Jelajahi koleksi kami dan nikmati proses yang cepat dan
          praktis. Dapatkan pengalaman membaca yang menyenangkan dan memperluas
          wawasan Anda dengan Skanic Library.
        </p>

        <Button title="Cari Buku" onClick={handleCariBukuClick} />
      </div>

      <div className="w-full md:w-2/4 flex justify-center md:justify-end mt-10 md:mt-0">
        <img src={img} alt="img" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Beranda;
