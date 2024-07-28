// PustakawanLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/Pustakawan/SidebarPustakawan';
import Navbar from '../../components/Dashboard/Pustakawan/NavbarPustakawan';

const PustakawanLayout = () => {
  return (
    <div className="home list_page add_new">
      <div className="home_sidebar">
        <Sidebar />
      </div>
      <div className="home_main list_page_main new_page">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PustakawanLayout;
