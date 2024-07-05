import React from "react";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./Navigation";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-hot-toast"

function Sidebar() {
  const { pathname } = useLocation();

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

  return (
    <div className="bg-neutral-50 flex flex-col justify-between text-neutral-800 gap-4 w-14 md:w-72 p-4">
      <div className="toppart flex-1">
        <div className="logo mb-6 font-semibold text-xl text-blue-600 hidden md:block text-center">
          SKANIC LIBRARY
        </div>
        <nav className="list-none">
          {DASHBOARD_SIDEBAR_LINKS.map((link) => {
            return (
              <Link
                to={link.path}
                key={link.key}
                className={`${
                  pathname === link.path
                    ? "text-blue-600  items-center gap-3 mb-3 font-semibold p-1 flex"
                    : "text-neutral-500 flex items-center gap-3 mb-3 font-semibold hover:bg-neutral-100 hover:text-blue-600 rounded p-1"
                }`}
              >
                {link.icon}{" "}
                <span className="text-sm hidden md:block">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="bottompart flex-2">
        <nav className="list-none">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => {
            return (
              <Link
                to={link.path}
                key={link.key}
                className={`${
                  pathname === link.path
                    ? "text-blue-600 flex items-center gap-3 mb-8 font-semibold p-1 "
                    : "text-neutral-500 flex items-center gap-3 mb-8 font-semibold hover:bg-neutral-100 hover:text-blue-600  rounded p-1"
                }`}
              >
                {link.icon}{" "}
                <span className="text-sm hidden md:block">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div
          className="flex items-center gap-3 p-1 hover:bg-neutral-100 text-neutral-500 hover:text-red-500 font-semibold"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <MdOutlineLogout fontSize={26} />
          <span className="text-sm hidden md:inline">Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
