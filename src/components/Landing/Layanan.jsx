import React from "react";
import Heading from "../../layouts/Landing/Heading";
import CoursesCard from "../../layouts/Landing/LayananCard";
import webImg from "../../assets/images/web-dev.svg";
import appImg from "../../assets/images/App-dev.svg";
import graphicImg from "../../assets/images/graphic.svg";
import kotaksaran from "../../assets/images/kotaksaran1.svg";

const Layanan = () => {
  return (
    <div
      id="service" // Tambahkan id agar sesuai dengan link di navbar
      className="min-h-[80vh] flex flex-col items-center justify-center text-center md:px-32 px-5 pt-20 mb-10" // Gunakan px-5 untuk padding responsif
    >
      <Heading title1="Nikmati Layanan" title2="Skanic Library" />

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        <CoursesCard
          img={webImg}
          title="Sirkulasi"
          text="Jelajahi koleksi kami dengan mudah dan nikmati pengalaman peminjaman dan pengembalian buku yang cepat dan efisien. Kami hadir untuk memudahkan Anda mengeksplorasi dunia pengetahuan."
        />
        <CoursesCard
          img={appImg}
          title="Referensi"
          text="Temukan sumber daya yang berharga untuk mendukung penelitian dan pembelajaran Anda. Skanic Library menyediakan akses ke berbagai referensi yang relevan untuk membantu memperluas wawasan Anda."
        />
        <CoursesCard
          img={graphicImg}
          title="Layanan terbitan berkala"
          text="Dapatkan akses eksklusif ke jurnal, majalah, dan publikasi terbaru dalam berbagai bidang. Jelajahi ragam informasi terkini dan tetap terhubung dengan perkembangan terbaru di dunia pengetahuan."
        />
        <CoursesCard
          img={kotaksaran}
          title="Kotak Saran"
          text="Bagikan masukan dan saran Anda dengan kami! Kami senang mendengar dari Anda untuk terus meningkatkan layanan kami. Bersama-sama, kita bisa membuat Skanic Library menjadi tempat yang lebih baik untuk semua anggota."
        />
      </div>
    </div>
  );
};

export default Layanan;
