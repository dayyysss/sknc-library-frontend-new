import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateBook = ({ book, onClose, fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [writer, setWriter] = useState("");
  const [page_amount, setPageAmount] = useState("");
  const [stock_amount, setStockAmount] = useState("");
  const [published, setPublished] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setSynopsis(book.synopsis || "");
      setIsbn(book.isbn || "");
      setWriter(book.writer || "");
      setPageAmount(book.page_amount || "");
      setStockAmount(book.stock_amount || "");
      setPublished(book.published || "");
      setCategory(book.category || "");
      setImage(book.image || "");
      setPublisher(book.publisher || "");
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("title", title);
    formData.append("synopsis", synopsis);
    formData.append("isbn", isbn);
    formData.append("writer", writer);
    formData.append("page_amount", page_amount);
    formData.append("stock_amount", stock_amount);
    formData.append("published", published);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("publisher", publisher);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/book/${book.id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Buku berhasil di edit!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          fetchBooks(); 
          onClose(); 
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal edit buku!",
          icon: "error",
          confirmButtonText: "OK"
        });
        setErrorMessage("Gagal Mengedit Buku!");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mengedit buku!",
        icon: "error",
        confirmButtonText: "OK"
      });
      setErrorMessage("Terjadi kesalahan saat mengedit buku!");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={modalRef} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Buku
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan nama buku"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Synopsis
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            placeholder="Masukkan synopsis singkat"
            required={true}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">ISBN</label>
          <div className="flex">
            <input
              type="text"
              maxLength="13"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Masukkan no isbn buku"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Penulis
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            placeholder="Masukkan penulis buku"
            required={true}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Jumlah Halaman
          </label>
          <div className="flex">
            <input
              type="number"
              value={page_amount}
              onChange={(e) => setPageAmount(e.target.value)}
              placeholder="Masukkan jumlah halaman buku"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Stok Buku
          </label>
          <div className="flex">
            <input
              type="number"
              value={stock_amount}
              onChange={(e) => setStockAmount(e.target.value)}
              placeholder="Masukkan stok buku"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tahun Terbit
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            placeholder="Masukkan tahun terbit"
            required={true}
          />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kategori
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required={true}
              >
                <option value="Buku Fiksi">Buku Fiksi</option>
                <option value="Buku Pengetahuan (Non paket)">Buku Pengetahuan (Non paket)</option>
                <option value="Kamus">Kamus</option>
                <option value="Ensiklopedia">Ensiklopedia</option>
                <option value="Al-Quran Tafsir">Al-Quran Tafsir</option>
                <option value="Buku Paket">Buku Paket</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Penerbit
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Masukkan penerbit buku"
            required={true}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Sampul Buku
          </label>
          <input
            type="file"
            accept="image/*"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileUpload}
            required
          />
        </div>

        <div className="col-span-2 flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UpdateBook;
