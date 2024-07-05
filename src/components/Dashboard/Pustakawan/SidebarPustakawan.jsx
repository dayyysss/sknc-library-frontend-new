import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { toast } from 'react-hot-toast';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            localStorage.removeItem("token");
            toast.success("Logout berhasil!", {
                position: "top-center",
            });

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            toast.error("Logout gagal!", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <NavLink to="/dashboard-pustakawan" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">SKANIC LIBRARY</h3>
                </NavLink>
            </div>

            <div className="links">
                <ul>
                    <p className="spann menu1 text-center">Main</p>
                    <NavLink to="/dashboard-pustakawan" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </NavLink>

                    <p className="spann menu2 text-center">Data Master</p>
                    <NavLink to="/dashboard-pustakawan/buku-tamu" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li>
                            <LocalLibraryIcon className="icon" /> Buku Tamu
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard-pustakawan/data-buku" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li>
                            <BookIcon className="icon" /> Data Buku
                        </li>
                    </NavLink>
                    <p className="spann menu3 text-center">Data Transaksi</p>
                    <NavLink to="/dashboard-pustakawan/peminjaman-buku" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li>
                            <BookmarkAddIcon className="icon" /> Peminjaman Buku
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard-pustakawan/pengembalian-buku" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li>
                            <BookmarkRemoveIcon className="icon" /> Pengembalian Buku
                        </li>
                    </NavLink>
                    <li onClick={handleLogout}>
                        <LogoutIcon className="icon" /> Keluar
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;