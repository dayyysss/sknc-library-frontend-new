// AdminLayout.jsx
import React from 'react';
import Sidebar from '../../components/Dashboard/Admin/SidebarAdmin';
import DashboardNav from '../../components/Dashboard/Admin/NavbarAdmin';
import './style.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex overflow-scroll">
      <div className="basis-[12%] h-[100vh]">
        <Sidebar />
      </div>
      <div className="basis-[88%] border overflow-scroll h-[100vh]">
        <DashboardNav />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
