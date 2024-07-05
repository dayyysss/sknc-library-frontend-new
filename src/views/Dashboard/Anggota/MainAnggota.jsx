// mainanggota.jsx
import React, { useEffect, useState } from "react";
import { FaRegCalendarMinus } from "react-icons/fa";
import Cookies from "js-cookie";
import AnggotaLayout from '../../../layouts/Dashboard/AnggotaLayout'; 

const Dashboard = () => {
  document.title = "Skanic Library - Dashboard";
  const [nameData, setNameData] = useState(""); // Menggunakan 'nameData' sebagai state

  useEffect(() => {
    loadName();
  }, []);

  const loadName = () => {
    const nameData = Cookies.get("name"); // Mengambil data dari cookie dengan kunci 'name'
    if (nameData) {
      setNameData(JSON.parse(nameData)); // Parsing JSON dan mengatur state
    }
  }

  return (
    <AnggotaLayout>
      <div className='px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>
            Hallo Selamat Datang, {nameData}!
          </h1> {/* Menampilkan nama pengguna */}
        </div>
        <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
          {/* <DashboardCard color="#4E73DF" count="5" title="LIHAT PEMINJAMAN" />
          <DashboardCard color="#1CC88A" count="20" title="LIHAT PENGEMBALIAN" />
          <DashboardCard color="#36B9CC" count="5" title="LIHAT RIWAYAT" />
          <DashboardCard color="#F6C23E" count="400" title="LIHAT DENDA" /> */}
        </div>
      </div>
    </AnggotaLayout>
  );
};

const DashboardCard = ({ color, count, title }) => (
  <div className={`h-[100px] rounded-[8px] bg-white border-l-[4px] border-${color} flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}>
    <div>
      <h2 className={`text-${color} text-[11px] leading-[17px] font-bold`}>{title}</h2>
      <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{count}</h1>
    </div>
    <FaRegCalendarMinus fontSize={28} color={color} />
  </div>
);

export default Dashboard;
