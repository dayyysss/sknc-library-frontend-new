import React, { useState } from 'react';
import { FaTachometerAlt, FaStickyNote, FaRegChartBar, FaChevronRight, FaChevronLeft, FaBook, FaUser, FaBookReader } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = (sidebar) => {
    setActiveSidebar(sidebar);
  };

  return (
    <div className={`bg-[#4E73DF] px-[25px] h-screen ${isSidebarOpen ? '' : 'w-[50px]'} transition-all`}>
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer text-center'>Skanic Library</h1>
      </div>

      <NavLink
        to="/dashboard-admin"
        className={`flex items-center justify-between gap-[15px] py-[20px] border-[#EDEDED]/[0.3] ${activeSidebar === 'dashboard' ? 'font-bold' : ''}`}
        onClick={() => handleSidebarClick('dashboard')}
      >
        <div className='flex items-center gap-[15px]'>
          <FaTachometerAlt color='white' />
          <p className='text-[14px] leading-[20px] text-white'>Dashboard</p>
        </div>
        {activeSidebar === 'dashboard' && <FaChevronRight color='white' />}
      </NavLink>

      <NavLink
        to="/dashboard-admin/buku-tamu"
        className={`flex items-center justify-between gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] ${activeSidebar === 'buku-tamu' ? 'font-bold' : ''}`}
        onClick={() => handleSidebarClick('buku-tamu')}
      >
        <div className='flex items-center gap-[15px]'>
          <FaBookReader color='white' />
          <p className='text-[14px] leading-[20px] text-white'>Buku Tamu</p>
        </div>
        {activeSidebar === 'buku-tamu' && <FaChevronRight color='white' />}
      </NavLink>

      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> DATA MASTER </p>

        <NavLink
          to="/dashboard-admin/manajemen-user"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'user' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('user')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaUser color='white' /> <p className='text-[14px] leading-[20px] text-white'>User</p>
          </div>
          {activeSidebar === 'user' && <FaChevronRight color='white' />}
        </NavLink>

        <NavLink
          to="/dashboard-admin/buku"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'buku' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('buku')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaBook color='white' /> <p className='text-[14px] leading-[20px] text-white'>Buku</p>
          </div>
          {activeSidebar === 'buku' && <FaChevronRight color='white' />}
        </NavLink>
      </div>

      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> DATA TRANSAKSI </p>

        <NavLink
          to="/dashboard-admin/peminjaman"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'peminjaman' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('peminjaman')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaStickyNote color='white' /> <p className='text-[14px] leading-[20px] text-white'>Peminjaman</p>
          </div>
          {activeSidebar === 'peminjaman' && <FaChevronRight color='white' />}
        </NavLink>

        <NavLink
          to="/dashboard-admin/pengembalian"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'pengembalian' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('pengembalian')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaRegChartBar color='white' /> <p className='text-[14px] leading-[20px] text-white'>Pengembalian</p>
          </div>
          {activeSidebar === 'pengembalian' && <FaChevronRight color='white' />}
        </NavLink>
      </div>

      <div className='pt-[15px]'>
        <div className='flex items-center justify-center'>
          <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer' onClick={toggleSidebar}>
            <FaChevronLeft color='white' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
