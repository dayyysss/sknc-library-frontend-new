import React from "react";
import img from "../../assets/images/contact.svg";
import Heading from "../../layouts/Landing/Heading";
import Button from "../../layouts/Landing/Button";

const Kontak = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center md:mx-32 mx-5 mt-10 pt-20">
      <Heading title1="Hubungi" title2="Kami" />

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 mt-10">
        <form className="w-full md:w-2/5 space-y-5">
          <div className="flex flex-col">
            <label htmlFor="userName">Nama Anda</label>
            <input
              className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="text"
              name="userName"
              id="userName"
              placeholder="Masukkan nama anda"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userEmail">Email Anda</label>
            <input
              className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Masukkan email anda"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userNumber">Nomor Anda</label>
            <input
              className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="tel"
              name="userNumber"
              id="userNumber"
              placeholder="Masukkan nomor anda"
              pattern="[0-9]{10,15}" // Mengizinkan nomor dengan panjang 10-15 digit
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userMessage">Pesan Anda</label>
            <textarea
              className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              name="userMessage"
              id="userMessage"
              placeholder="Masukkan pesan anda"
            />
          </div>

          <div className="flex justify-center">
            <Button title="Kirim Pesan" />
          </div>
        </form>

        <div className="w-full md:w-2/4 flex justify-center md:justify-center">
          <img src={img} alt="Kontak Skanic Library" className="max-w-md h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Kontak;
