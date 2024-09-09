import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from "@mui/icons-material/Book";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { toast } from "react-hot-toast";
import "./navbar.scss";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userImage, setUserImage] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    toast.success("Logout berhasil!", {
      position: "top-center",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        toast.error('User ID tidak ditemukan.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${storedUserId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.data.success) {
          setUserImage(response.data.data.image);
        } else {
          toast.error('Gagal mengambil data pengguna.');
        }
      } catch (error) {
        toast.error('Terjadi kesalahan saat mengambil data pengguna.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_main">
        <div className="menu_logo">
          {toggle ? (
            <CloseIcon className="menu_icon" onClick={handleToggle} />
          ) : (
            <MenuIcon className="menu_icon" onClick={handleToggle} />
          )}

          <Link to="/dashboard-pustakawan" style={{ textDecoration: "none" }}>
            <h3 className="text_none">SKANIC LIBRARY</h3>
          </Link>
        </div>

        <div className="item_lists">
          <div className="item">
            <NotificationsNoneIcon className="item_icon" />
            <span className="badge">0</span>
          </div>

          <div className="item_lists">
            <div className="item">
              <img
                className="admin_pic"
                src={userImage || 'path/to/default/image.svg'} // Gambar default jika tidak ada
                alt="admin"
                onClick={toggleProfileDropdown}
              />
              {showProfileDropdown && (
                <div className='bg-white border h-[45px] w-[120px] absolute bottom-[-50px] z-20 right-0 pt-[8px] space-y-[10px] text-center'>
                  <ul>
                    <li onClick={handleLogout} className="cursor-pointer hover:text-red-500">Keluar</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="res_navbar">
        {toggle && (
          <div className="res_nav_menu">
            <div className="res_nav_menuu">
              <div className="links">
                <ul>
                  <p className="spann">Main</p>
                  <Link
                    to="/dashboard-pustakawan"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <DashboardIcon className="icon" /> Dashboard
                    </li>
                  </Link>

                  <p className="spann">Data Master</p>
                  <Link
                    to="/dashboard-pustakawan/buku-tamu"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <LocalLibraryIcon className="icon" /> Buku Tamu
                    </li>
                  </Link>
                  <Link
                    to="/dashboard-pustakawan/data-buku"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <BookIcon className="icon" /> Data Buku
                    </li>
                  </Link>
                  <p className="spann">Data Transaksi</p>
                  <Link to="/dashboard-pustakawan/peminjaman-buku" style={{ textDecoration: 'none' }}>
                    <li>
                      <BookmarkAddIcon className="icon" /> Peminjaman Buku
                    </li>
                  </Link>
                  <Link to="/dashboard-pustakawan/pengembalian-buku" style={{ textDecoration: 'none' }}>
                    <li>
                      <BookmarkRemoveIcon className="icon" /> Pengembalian Buku
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
