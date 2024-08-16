import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import axios from "axios";
import swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { Card } from 'antd';
import Alert from '@mui/material/Alert';
import { FiInfo } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function DaftarBukuA() {
  document.title = "Skanic Library - Daftar Buku";

  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { Meta } = Card;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
    fetchBorrowedBooks();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
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

  const fetchBorrowedBooks = async () => {
    const userId = getUserId();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/borrow/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data.success) {
        const borrowedBooks = response.data.data.map(borrow => borrow.book_id);
        setBorrowedBooks(borrowedBooks);
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

  const getUserId = () => {
    return localStorage.getItem("user_id");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const filteredBooks = searchKeyword
    ? books.filter((book) =>
      book.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    : books;

    const handleSearch = (e) => {
      e.preventDefault();
      setSearchKeyword(query); 
    };

  const handleBookClick = async (bookId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data.success) {
        setSelectedBook(response.data.data);
        openModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePinjamBuku = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    if (!token || !userId) {
      swal.fire("Error", "User not authenticated", "error");
      return;
    }
  
    if (borrowedBooks.includes(selectedBook.id)) {
      swal.fire("Info!", "Kamu sudah meminjam buku ini!", "info");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/borrow/create",
        {
          borrowing_start: startDate.toISOString().split("T")[0],
          borrowing_end: endDate.toISOString().split("T")[0],
          book_id: selectedBook.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        swal.fire("Sukses Meminjam Buku!", response.data.message, "success");
        setBorrowedBooks([...borrowedBooks, selectedBook.id]); // Perbarui daftar borrowedBooks
        setModalOpen(false);
      } else {
        swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "User belum aktif! Tidak dapat meminjam buku!";
      swal.fire("Error", errorMessage, "error");
    }
  };  

  const booksTop = books.slice(0, 4);
  const booksBottom = books.slice(4);

  const handleDetailClick = async (bookId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data.success) {
        setSelectedBook(response.data.data);
        openModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    closeModal();
  };

  return (
    <>
        <div className="px-[25px] pt-[25px] bg-white min-h-screen">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Daftar Buku
          </h1>
          <div className="flex items-center justify-between">
            <h1>Buku Yang Tersedia : {totalBooks}</h1>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Kategori
                  <IoIosArrowDropdown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Komik
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Novel
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Fiksi
                        </a>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Non Fiksi
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="mt-4">
          <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
            <div className="flex items-center border border-slate-500 rounded">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari data buku di sini..."
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-left">Total Buku : {totalBooks}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {filteredBooks.length === 0 && (
            <Alert variant="outlined" severity="warning">
              Tidak ada data buku yang tersedia!
            </Alert>
          )}
          {filteredBooks.map((book, index) => (
            <div key={index + 1} className="bg-white p-4 rounded shadow-md hover:shadow-lg flex flex-col">
              <button onClick={() => handleBookClick(book.id)} className="cursor-pointer focus:outline-none">
                <div className="flex justify-center">
                  <img src={book.image} alt={book.title} className="h-52 w-52 object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-5">{book.title}</h3>
              </button>

                  <Typography variant="body2" color="text.secondary" align="center">
                    Penulis: {book.writer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Kategori: {book.category}
                  </Typography>
                <CardActions className="flex justify-center">
                  <Typography style={{ color: book.stock_amount === 0 ? "red" : "#4CAF50", fontWeight: "bold" }}>
                    {book.stock_amount === 0 ? "Tidak Tersedia" : "Tersedia"}
                  </Typography>
                </CardActions>

                <CardActions className="flex justify-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDetailClick(book.id)}
                  >
                    Pinjam
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDetailClick(book.id)}
                  >
                    Detail
                  </Button>
                </CardActions>
              </div>
          ))}
        </div>
        
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            className="mt-11 flex justify-center items-center"
          />
        </div>

        {modalOpen && selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="z-auto bg-white p-4 rounded-lg max-w-max w-full mx-2 flex">
              <div className="md:w-auto mr-4">
                <img src={selectedBook.image} alt="Sampul Buku" className="w-80 h-80 object-fill mx-auto" />
              </div>
              <div className="w-2/3 flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-center">Detail Buku </h2>
                <p className="text-left">Judul: {selectedBook.title}</p>
                <p className="text-left">Sinopsis: {selectedBook.synopsis}</p>
                <p className="text-left">Kategori: {selectedBook.category}</p>
                <p className="text-left">ISBN: {selectedBook.isbn}</p>
                <p className="text-left">Penulis: {selectedBook.writer}</p>
                <p className="text-left">Stok Buku: {selectedBook.stock_amount}</p>
                <p className="text-left">Diterbitkan: {selectedBook.published}</p>
                <p className="text-left" style={{ color: selectedBook.stock_amount === 0 ? "red" : "#4CAF50" }}>
                  Status: {selectedBook.stock_amount === 0 ? "Tidak Tersedia" : "Tersedia"}
                </p>
                <div className="mt-5">
                  <div className="mb-4">
                    <label className="block mb-2">Tanggal Peminjaman Awal</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy/MM/dd"
                      minDate={new Date()}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Tanggal Peminjaman Akhir</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="yyyy/MM/dd"
                      minDate={startDate}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                    <div className="flex items-center">
                      <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handlePinjamBuku}>Pinjam</button>
                      <button className="bg-gray-500 text-white px-4 py-2" onClick={handleCloseModal}>Tutup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default DaftarBukuA;
