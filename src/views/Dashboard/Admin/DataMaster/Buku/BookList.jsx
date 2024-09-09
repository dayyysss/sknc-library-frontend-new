import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Button, Alert, Modal, Input } from "antd";
import { FiInfo } from "react-icons/fi";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateBook from "./UpdateBook";
import { PiMicrosoftExcelLogoLight, PiExportLight } from "react-icons/pi";
import DetailBook from "./DetailBook";
import ImportBook from "./ImportBook";

const { Search } = Input;

const BookList = () => {
  document.title = "Dashboard Admin - Data Buku";
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, searchKeyword]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/book?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
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
        await axios.delete(`http://127.0.0.1:8000/api/book/${id}`, {
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

  const handleUpdate = (id) => {
    const selectedBook = books.find(book => book.id === id);
    if (selectedBook) {
      setSelectedBook(selectedBook);
      setIsEditModalOpen(true);
    } else {
      console.error("Book not found!");
    }
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleBookClick = async (bookId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (response.data.success) {
        setSelectedBook(response.data.data);
        setIsDetailModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImportExcel = () => {
    setIsImportModalOpen(true);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  const filteredBooks = searchKeyword
    ? books.filter((book) =>
      book.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    : books;

  const exportAll = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/allbook/export", {
        responseType: "blob",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatbook.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          title: "Sukses!",
          text: "Data Buku Berhasil DiExport!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: "Data Buku Gagal Di Export",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Export error:", error);
      });
  };

  return (
    <>
      <div className="min-h-screen px-6 pt-6 pb-6 bg-[#F8F9FC] overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#5a5c69]">
            Data Buku
          </h1>
          <div className="flex space-x-4">
            <Button type="default"
              className="bg-blue-500 text-white hover:bg-blue-600">
              <Link
                to="/dashboard-admin/buku/tambah-buku"
                className="ant-btn ant-btn-primary"
              >
                Tambah Buku
              </Link>
            </Button>
            <Button
              type="default"
              onClick={exportAll}
            >
              <PiExportLight className="text-xl mr-2" />
              Export Buku
            </Button>
            <Button
              type="default"
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleImportExcel}
            >
              <PiMicrosoftExcelLogoLight className="text-xl mr-2" />
              Import Excel
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Search
            placeholder="Cari data buku di sini..."
            onSearch={handleSearch}
            enterButton
          />
        </div>
        <p className="mt-4 text-left">Total Buku : {totalBooks}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {filteredBooks.length === 0 && (
            <Alert
              message="Tidak ada data buku yang tersedia!"
              type="warning"
              showIcon
            />
          )}
          {filteredBooks.map((book, index) => (
            <div key={index + 1} className="bg-white p-4 rounded shadow-md hover:shadow-lg flex flex-col">
              <button onClick={() => handleBookClick(book.id)} className="cursor-pointer focus:outline-none">
                <div className="flex justify-center">
                  <img src={book.image} alt={book.title} className="h-[200px] w-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-5">{book.title}</h3>
              </button>
              <p className="text-gray-600 mb-2 flex-grow text-center">{book.writer}</p>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Stok Buku : {book.stock_amount}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookClick(book.id)}
                    className="text-green-500 flex items-center"
                  >
                    <FiInfo className="mr-2" /> Detail
                  </button>
                  <button
                    onClick={() => handleUpdate(book.id)}
                    className="text-blue-500 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-500 flex items-center"
                  >
                    <RiDeleteBin5Line className="mr-2" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
        <p className="text-left mt-8">
          Page: {page} of {totalPages}
        </p>
        <div className="flex justify-center items-center mb-9">
          <Pagination
            current={page}
            total={totalPages * 10} // Assuming 10 items per page
            onChange={handleChangePage}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Modal
        title="Update Book"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        {selectedBook && <UpdateBook book={selectedBook} onClose={() => setIsEditModalOpen(false)} />}
      </Modal>

      <Modal
        title="Detail Book"
        visible={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        >
        {selectedBook && <DetailBook book={selectedBook} closeModal={() => setIsDetailModalOpen(false)} />}
      </Modal>

      <Modal
        title="Import Book"
        visible={isImportModalOpen}
        onCancel={handleCloseImportModal}
        footer={null}
      >
        <ImportBook onClose={handleCloseImportModal} />
      </Modal>
    </>
  );
};

export default BookList;
