import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/Dashboard/Admin/SidebarAdmin';
import DashboardNav from '../../components/Dashboard/Admin/NavbarAdmin';
import './style.css';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1">
        <DashboardNav />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
