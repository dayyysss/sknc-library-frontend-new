import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateUser from "./UpdateUser";
import { MdOutlineCheckBox } from "react-icons/md";
import AddUserModal from "./AddUser";
import { PiMicrosoftExcelLogoLight, PiExportLight } from "react-icons/pi";
import ImportExcel from "../../ImportExcel";
import TextField from "@mui/material/TextField";

const ListUser = () => {
  document.title = "Dashboard Admin - Data User";
  const [books, setBooks] = useState([]);
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, role]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        params: {
          role: role, // Mengirim parameter role ke server
          search: searchKeyword, // Mengirim parameter pencarian ke server
          page: page, // Mengirim parameter halaman ke server
        },
      });
      if (response.data.success) {
        const { data, last_page, total } = response.data.data;
        setBooks(data);
        setTotalPages(last_page);
        setTotalBooks(total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Yakin Mau Hapus?",
        text: "Data akan dihapus dari database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus saja!",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (user) => {
    setSelectedBook(user); // Simpan seluruh objek pengguna, bukan hanya ID
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setPage(1);
    fetchData();
  };

  const handleStatusChange = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user/${id}/update-status`,
        {
          status: "active",
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      fetchData();
      Swal.fire({
        title: "Sukses!",
        text: "Status user berhasil terubah menjadi Aktif!.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  const refreshData = () => {
    fetchData();
  };

  const handleImportExcel = () => {
    setIsImportModalOpen(true);
  };

  const exportAll = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/alluser/export", {
        responseType: "blob",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatuser.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          title: "Sukses!",
          text: "Data User Berhasil DiExport!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: "Data User Gagal Di Export",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Export error:", error);
      });
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC] overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Data User
          </h1>
          <div className="flex">
            <button
              onClick={handleAddUser}
              className="bg-blue-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px] mr-4"
            >
              Tambah User
            </button>
            <button
              className="bg-slate-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px] mr-4"
              onClick={exportAll}
            >
              <PiExportLight className="text-xl mr-2" />
              Export User
            </button>
            <button
              onClick={handleImportExcel}
              className="bg-green-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]"
            >
              <PiMicrosoftExcelLogoLight className="text-xl mr-2" />
              Import User
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between">
          <TextField
            label="Cari data user..."
            variant="outlined"
            size="small"
            className="searchKeyword-4 py-2 mr-4 rounded"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <div className="relative ml-4">
            <select
              className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="">Pilih Role</option>
              <option value="pustakawan">Pustakawan</option>
              <option value="anggota">Anggota</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                />
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM1 10a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-4 text-left">Total : {totalBooks}</p>
        <table className="w-full table-auto mt-4 border border-slate-500 border-collapse bg-white shadow-md text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-[#CBD5E0] w-[5%]">No</th>
              <th className="px-4 py-2 border border-[#CBD5E0]">Username</th>
              <th className="px-4 py-2 border border-[#CBD5E0]">Email</th>
              <th className="px-4 py-2 border border-[#CBD5E0]">Sebagai</th>
              <th className="px-4 py-2 border border-[#CBD5E0]">Status</th>
              <th className="px-4 py-2 border border-[#CBD5E0] w-[5%]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((user, index) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {/* Tampilkan semua role yang dimiliki user dengan warna berbeda */}
                  {user.roles.map((role) => {
                    // Tentukan warna berdasarkan nama role
                    let roleColor;
                    if (role.name === "pustakawan") {
                      roleColor = "bg-blue-500"; // Warna untuk pustakawan
                    } else if (role.name === "anggota") {
                      roleColor = "bg-green-500"; // Warna untuk anggota
                    } else {
                      roleColor = "bg-gray-200"; // Default color untuk role lainnya
                    }

                    return (
                      <span
                        key={role.id}
                        className={`inline-block ${roleColor} rounded-full px-3 py-1 text-sm font-semibold text-white mr-2`}
                      >
                        {role.name}
                      </span>
                    );
                  })}
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`text-white px-3 rounded-full p-1 ${user.status === "Belum Aktif"
                      ? "bg-yellow-500"
                      : user.status === "Aktif"
                        ? "bg-green-500"
                        : ""
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    {user.status === "Belum Aktif" && (
                      <MdOutlineCheckBox
                        onClick={() => handleStatusChange(user.id)}
                        className="text-white cursor-pointer text-lg bg-green-500 rounded-full p-1 mr-2 w-7 h-7"
                      />
                    )}
                    <FaEdit
                      onClick={() => handleUpdate(user)} // Kirim seluruh objek user, bukan hanya user.id
                      className="text-white cursor-pointer text-lg bg-blue-500 rounded-full p-1 mr-2 w-7 h-7"
                    />
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(user.id)}
                      className="text-white cursor-pointer w-7 h-7 bg-red-500 rounded-full p-1 mr-2"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        <p className="text-left mt-8">
          Page: {page} of {totalPages}
        </p>
        <div
          className="flex justify-center items-center mb-9"
          aria-label="pagination"
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
            {selectedBook !== null ? (
              <UpdateUser user={selectedBook} onClose={handleCloseModal} />
            ) : (
              <AddUserModal onClose={handleCloseModal} refreshData={refreshData} />
            )}
          </div>
        </div>
      )}

      {/* Modal unggah Excel */}
      {isImportModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ImportExcel onClose={handleCloseImportModal} refreshData={refreshData} />
          </div>
        </div>
      )}
    </>
  );
};

export default ListUser;
