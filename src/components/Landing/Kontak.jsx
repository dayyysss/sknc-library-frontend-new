import React from "react";
import img from "../../assets/images/contact.svg";
import Heading from "../../layouts/Landing/Heading";
import Button from "../../layouts/Landing/Button";

const Kontak = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
      <Heading title1="Hubungi" title2="Kami" />

      <div className=" flex flex-col md:flex-row justify-between w-full">
        <form className=" w-full md:w-2/5 space-y-5 pt-20">
          <div className=" flex flex-col">
            <label htmlFor="userName">Nama Anda</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="text"
              name="userName"
              id="userName"
              placeholder="Masukkan nama anda"
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="userEmail">Email Anda</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Masukkan email anda"
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="userNumber">Nomor Anda</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all bg-[#F5F7F8]"
              type="text"
              name="userNumber"
              id="userNumber"
              placeholder="Masukkan nomor anda"
            />
          </div>

          <div className=" flex flex-row justify-center">
            <Button title="Kirim Pesan" />
          </div>
        </form>

        <div className=" w-full md:w-2/4">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Kontak;
