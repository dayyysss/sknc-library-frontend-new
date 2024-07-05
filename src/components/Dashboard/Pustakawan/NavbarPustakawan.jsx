import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from "@mui/icons-material/Book";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";


// import sass file
import "./navbar.scss";

// import images
import admin from "../../../assets/images/admin_pic.jpg";
import { toast } from "react-hot-toast";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem("token");
    // Tampilkan pemberitahuan logout berhasil di tengah layar
    toast.success("Logout berhasil!", {
      position: "top-center",
    });
    // Tunda pengalihan ke halaman login setelah 2 detik
    setTimeout(() => {
      window.location.href = "/";
    }, 2000); // Ubah angka 2000 menjadi jumlah milidetik yang Anda inginkan
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown); // Toggle state untuk menampilkan atau menyembunyikan dropdown profil
  };

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
        <div className="search">
          <input type="text" placeholder="Search.." />

          <SearchIcon className="search_icon" />
        </div>

        <div className="item_lists">
          {/* <div className="item item_lan">
            <LanguageIcon className="item_icon" />
            <p>English</p>
          </div> */}
          {/* <div className="item">
            {!darkMode ? (
              <DarkModeIcon
                className="item_icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <LightModeIcon
                className="item_icon white"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div> */}
          {/* <div className="item">
            <FullscreenExitIcon className="item_icon" />
          </div> */}

          <div className="item">
            <ChatBubbleOutlineIcon className="item_icon" />
            <span className="badge">2</span>
          </div>
          <div className="item">
            <NotificationsNoneIcon className="item_icon" />
            <span className="badge">1</span>
          </div>

          <div className="item_lists">
            <div className="item">
              <img
                className="admin_pic"
                src={admin}
                alt="admin"
                onClick={toggleProfileDropdown} // Menambahkan event onClick untuk menampilkan dropdown profil saat gambar admin diklik
              />
              {showProfileDropdown && ( // Menampilkan dropdown profil jika showProfileDropdown bernilai true
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
                  <li onClick={handleLogout}>
                    <LogoutIcon className="icon" /> Logout
                  </li>
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
