// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './views/LandingPage/Landing';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import NotFound from './views/NotFound';

import MainAdmin from './views/Dashboard/Admin/MainAdmin';
import BukuTamu from './views/Dashboard/Admin/DataMaster/Buku Tamu/BukuTamu';
import ManajemenUser from './views/Dashboard/Admin/DataMaster/ManajemenUser/ListUser';
import ListBuku from './views/Dashboard/Admin/DataMaster/Buku/BookList';
import TambahBuku from './views/Dashboard/Admin/DataMaster/Buku/AddBook';
import PeminjamanBuku from './views/Dashboard/Admin/DataTransaksi/Peminjaman';
import PengembalianBuku from './views/Dashboard/Admin/DataTransaksi/Pengembalian';
import Denda from './views/Dashboard/Admin/DataTransaksi/Denda';

import MainPustakawan from './views/Dashboard/Pustakawan/MainPustakawan';
import BukuTamuP from './views/Dashboard/Pustakawan/BukuTamu/BukuTamuP';
import DataBukuP from './views/Dashboard/Pustakawan/DataBuku/BooksList';
import TambahBukuP from './views/Dashboard/Pustakawan/DataBuku/BookAdd';
import UpdateBukuP from './components/Dashboard/Pustakawan/DataBuku/UpdateBook';
import PeminjamanBukuP from './views/Dashboard/Pustakawan/Peminjaman/PeminjamanBuku';
import PengembalianBukuP from './views/Dashboard/Pustakawan/Pengembalian/PengembalianBuku';

import MainAnggota from './views/Dashboard/Anggota/MainAnggota';
import DaftarBukuA from './views/Dashboard/Anggota/DaftarBukuA';
import PeminjamanBukuA from './views/Dashboard/Anggota/PeminjamanA';
import PengembalianBukuA from './views/Dashboard/Anggota/PengembalianA';
import DendaA from './views/Dashboard/Anggota/DendaA';

import AdminLayout from './layouts/Dashboard/AdminLayout';
import AnggotaLayout from './layouts/Dashboard/AnggotaLayout';
import PustakawanLayout from './layouts/Dashboard/PustakawanLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing title="Landing" />} />
        <Route path="/login" element={<Login title="Login" />} />
        {/* <Route path="/register" element={<Register title="Register" />} /> */}

        <Route path="/dashboard-admin" element={<AdminLayout />}>
          <Route index element={<MainAdmin />} />
          <Route path="buku-tamu" element={<BukuTamu type="tamu" />} />
          <Route path="manajemen-user" element={<ManajemenUser type="user" />} />
          <Route path="buku" element={<ListBuku type="buku" />} />
          <Route path="buku/tambah-buku" element={<TambahBuku type="buku" />} />
          <Route path="peminjaman" element={<PeminjamanBuku type="peminjaman" />} />
          <Route path="pengembalian" element={<PengembalianBuku type="pengembalian" />} />
          <Route path="denda" element={<Denda type="denda" />} />
        </Route>

        <Route path="/dashboard-pustakawan" element={<PustakawanLayout />}>
          <Route index element={<MainPustakawan />} />
          <Route path="buku-tamu" element={<BukuTamuP />} />
          <Route path="data-buku" element={<DataBukuP />} />
          <Route path="data-buku/tambah-buku" element={<TambahBukuP />} />
          <Route path="data-buku/memperbarui-buku" element={<UpdateBukuP />} />
          <Route path="peminjaman-buku" element={<PeminjamanBukuP />} />
          <Route path="pengembalian-buku" element={<PengembalianBukuP />} />
        </Route>

        <Route path="/dashboard-anggota" element={<AnggotaLayout />}>
          <Route index element={<MainAnggota />} />
          <Route path="daftar-buku" element={<DaftarBukuA type="buku" />} />
          <Route path="peminjaman-buku" element={<PeminjamanBukuA type="peminjaman" />} />
          <Route path="pengembalian-buku" element={<PengembalianBukuA type="pengembalian" />} />
          <Route path="denda" element={<DendaA type="denda" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
