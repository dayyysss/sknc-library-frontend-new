import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination, Badge, Button, Input, Select } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { PiMicrosoftExcelLogoLight, PiExportLight } from "react-icons/pi";
import ImportExcel from "../../ImportExcel";
import UpdateUser from "./UpdateUser";
import AddUserModal from "./AddUser";
import 'antd/dist/reset.css'; // Pastikan gaya Ant Design dimuat

const { Option } = Select;
const { Search } = Input;

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
          role: role,
          search: searchKeyword,
          page: page,
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
    setSelectedBook(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
    setPage(1);
    fetchData();
  };

  const handleRoleChange = (value) => {
    setRole(value);
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

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => (page - 1) * 10 + index + 1,
      width: '5%',
      align: 'center',
    },
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Peran',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => (
        <>
          {roles.map(role => {
            let roleColor;
            if (role.name === "pustakawan") {
              roleColor = "blue";
            } else if (role.name === "anggota") {
              roleColor = "green";
            } else {
              roleColor = "gray";
            }

            return (
              <Badge key={role.id} color={roleColor} text={role.name} style={{ marginRight: '8px' }} />
            );
          })}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Badge
          color={status === "Belum Aktif" ? "yellow" : "green"}
          text={status}
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => (
        <img
          src={image}
          alt="user"
          style={{ width: '48px', borderRadius: '50%', border: '1px solid #d9d9d9' }}
        />
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, user) => (
        <div className="flex justify-center items-center">
          {user.status === "Belum Aktif" && (
            <MdOutlineCheckBox
              onClick={() => handleStatusChange(user.id)}
              className="text-white cursor-pointer text-2xl bg-green-500 rounded-full p-1 mr-2"
            />
          )}
          <FaEdit
            onClick={() => handleUpdate(user)}
            className="text-white cursor-pointer text-2xl bg-blue-500 rounded-full p-1 mr-2"
          />
          <RiDeleteBin5Line
            onClick={() => handleDelete(user.id)}
            className="text-white cursor-pointer text-2xl bg-red-500 rounded-full p-1"
          />
        </div>
      ),
      width: '15%',
      align: 'center',
    },
  ];

  return (
    <>
      <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC] overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Data User
          </h1>
          <div className="flex">
            <Button
              onClick={handleAddUser}
              type="primary"
              style={{ marginRight: '8px' }}
            >
              Tambah User
            </Button>
            <Button
              type="default"
              style={{ marginRight: '8px' }}
              onClick={exportAll}
            >
              <PiExportLight className="text-xl mr-2" />
              Export User
            </Button>
            <Button
              onClick={handleImportExcel}
              type="default"
              style={{ marginRight: '8px', backgroundColor: '#4CAF50', color: '#fff' }}
            >
              <PiMicrosoftExcelLogoLight className="text-xl mr-2" />
              Import User
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Search
            placeholder="Cari data user..."
            onSearch={handleSearch}
            enterButton
            style={{ width: 300, marginRight: '16px' }}
          />
          <Select
            placeholder="Pilih Role"
            value={role}
            onChange={handleRoleChange}
            style={{ width: 200 }}
          >
            <Option value="">Semua Role</Option>
            <Option value="pustakawan">Pustakawan</Option>
            <Option value="anggota">Anggota</Option>
          </Select>
        </div>
        <p className="mt-4 text-left">Total : {totalBooks}</p>
        <Table
          columns={columns}
          dataSource={filteredBooks}
          pagination={false}
          rowKey="id"
        />
        <div className="flex justify-center items-center mt-4">
          <Pagination
            current={page}
            total={totalBooks}
            pageSize={10}
            onChange={handleChangePage}
            showSizeChanger={false}
          />
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
