import { CiHome, CiShoppingCart } from "react-icons/ci";
import { LuBookCopy } from "react-icons/lu";
import { PiToolbox } from "react-icons/pi";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookDown } from "react-icons/lu";
import { PiBooksLight } from "react-icons/pi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard-anggota",
    icon: <CiHome fontSize={26} />,
  },
  {
    key: "daftarbuku",
    label: "Daftar Buku",
    path: "/dashboard-anggota/daftar-buku",
    icon: <PiBooksLight fontSize={26} />,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    path: "/dashboard-anggota/peminjaman-buku",
    icon: <LuBookCopy fontSize={26} />,
  },
  {
    key: "pengembalian",
    label: "Pengembalian",
    path: "/dashboard-anggota/pengembalian-buku",
    icon: <LuBookDown fontSize={26} />,
  },
  // {
  //   key: "riwayat",
  //   label: "Riwayat",
  //   path: "/dashboard-anggota/riwayat-buku",
  //   icon: <MdHistory fontSize={26} />,
  // },
  {
    key: "denda",
    label: "Denda",
    path: "/dashboard-anggota/denda",
    icon: <PiToolbox fontSize={26} />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/settings",
  //   icon: <IoSettingsOutline fontSize={26} />,
  // },
];
