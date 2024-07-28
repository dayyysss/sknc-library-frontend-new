import React, { useState } from 'react';
import { FaTachometerAlt, FaStickyNote, FaRegChartBar, FaChevronRight, FaChevronLeft, FaBook, FaUser, FaBookReader } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo/logosl.png';

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
    <div className="flex h-screen">
      <div className={`bg-[#4E73DF] px-[25px] h-full ${isSidebarOpen ? 'w-[200px]' : 'w-[60px]'} transition-all`}>
        <div className='py-[30px] flex items-center justify-between border-b-[1px] border-[#EDEDED]/[0.3]'>
          <h1 className={`text-white text-[20px] leading-[24px] font-extrabold text-center ${isSidebarOpen ? 'block' : 'hidden'}`}>
            Skanic Library
          </h1>
          {!isSidebarOpen && <img src={logo} alt="Logo" className="h-12 w-12" />}
        </div>
        <NavLink
          to="/dashboard-admin"
          className={`flex items-center justify-between gap-[15px] py-[20px] border-[#EDEDED]/[0.3] ${activeSidebar}`}
          onClick={() => handleSidebarClick('dashboard')}
        >
          <div className='flex items-center gap-[15px]'>
            <FaTachometerAlt color='white' />
            {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>Dashboard</p>}
          </div>
          {activeSidebar === 'dashboard' && isSidebarOpen && <FaChevronRight color='white' />}
        </NavLink>
        <NavLink
          to="/dashboard-admin/buku-tamu"
          className={`flex items-center justify-between gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] ${activeSidebar}`}
          onClick={() => handleSidebarClick('buku-tamu')}
        >
          <div className='flex items-center gap-[15px]'>
            <FaBookReader color='white' />
            {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>Buku Tamu</p>}
          </div>
          {activeSidebar === 'buku-tamu' && isSidebarOpen && <FaChevronRight color='white' />}
        </NavLink>
        <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <p className={`text-[10px] font-extrabold leading-[16px] text-white/[0.4] ${isSidebarOpen ? 'block' : 'hidden'}`}>DATA MASTER</p>
          <NavLink
            to="/dashboard-admin/manajemen-user"
            className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar}`}
            onClick={() => handleSidebarClick('user')}
          >
            <div className='flex items-center gap-[10px]'>
              <FaUser color='white' />
              {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>User</p>}
            </div>
            {activeSidebar === 'user' && isSidebarOpen && <FaChevronRight color='white' />}
          </NavLink>
          <NavLink
            to="/dashboard-admin/buku"
            className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar}`}
            onClick={() => handleSidebarClick('buku')}
          >
            <div className='flex items-center gap-[10px]'>
              <FaBook color='white' />
              {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>Buku</p>}
            </div>
            {activeSidebar === 'buku' && isSidebarOpen && <FaChevronRight color='white' />}
          </NavLink>
        </div>
        <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
          <p className={`text-[10px] font-extrabold leading-[16px] text-white/[0.4] ${isSidebarOpen ? 'block' : 'hidden'}`}>DATA TRANSAKSI</p>
          <NavLink
            to="/dashboard-admin/peminjaman"
            className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar}`}
            onClick={() => handleSidebarClick('peminjaman')}
          >
            <div className='flex items-center gap-[10px]'>
              <FaStickyNote color='white' />
              {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>Peminjaman</p>}
            </div>
            {activeSidebar === 'peminjaman' && isSidebarOpen && <FaChevronRight color='white' />}
          </NavLink>
          <NavLink
            to="/dashboard-admin/pengembalian"
            className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar}`}
            onClick={() => handleSidebarClick('pengembalian')}
          >
            <div className='flex items-center gap-[10px]'>
              <FaRegChartBar color='white' />
              {isSidebarOpen && <p className='text-[14px] leading-[20px] text-white'>Pengembalian</p>}
            </div>
            {activeSidebar === 'pengembalian' && isSidebarOpen && <FaChevronRight color='white' />}
          </NavLink>
        </div>
        <div className='pt-[15px]'>
          <div className='flex items-center justify-center'>
            <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer' onClick={toggleSidebar}>
              {isSidebarOpen ? <FaChevronLeft color='white' /> : <FaChevronRight color='white' />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
