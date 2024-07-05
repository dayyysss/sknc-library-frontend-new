// AnggotaLayout.jsx
import React from 'react';
import Sidebar from '../../components/Dashboard/Anggota/SidebarAnggota'; 
import Header from '../../components/Dashboard/Anggota/HeaderAnggota';   

const AnggotaLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full gap-1 bg-neutral-200">
         <Sidebar />
         <div className="w-full flex flex-col">
         <Header />
         <div className="custom-scrollbar flex-grow overflow-y-scroll bg-inherit  px-6 py-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnggotaLayout;
