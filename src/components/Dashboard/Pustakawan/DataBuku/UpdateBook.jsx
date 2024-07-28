import React, { useState, useEffect, useRef } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const UpdateBook = ({ book, fetchBooks, onClose, open }) => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [writer, setWriter] = useState("");
  const [pageAmount, setPageAmount] = useState("");
  const [stockAmount, setStockAmount] = useState("");
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
    formData.append("page_amount", pageAmount);
    formData.append("stock_amount", stockAmount);
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
        onClose(); 
        Swal.fire({
          title: "Berhasil!",
          text: "Buku berhasil di edit!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          fetchBooks();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'synopsis':
        setSynopsis(value);
        break;
      case 'isbn':
        setIsbn(value);
        break;
      case 'writer':
        setWriter(value);
        break;
      case 'page_amount':
        setPageAmount(value);
        break;
      case 'stock_amount':
        setStockAmount(value);
        break;
      case 'published':
        setPublished(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'publisher':
        setPublisher(value);
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-white rounded-lg w-11/12 md:w-2/3 p-6 relative" onClick={(e) => e.stopPropagation()}>
          <Typography id="modal-title" variant="h6" component="h2" className="font-bold text-lg mb-4">
            Memperbarui Data Buku
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              margin="normal"
              label="Judul Buku"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Synopsis"
              name="synopsis"
              value={synopsis}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="ISBN"
              name="isbn"
              value={isbn}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Penulis"
              name="writer"
              value={writer}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Jumlah Halaman"
              name="page_amount"
              value={pageAmount}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Stok Buku"
              name="stock_amount"
              value={stockAmount}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Penerbit"
              name="publisher"
              value={publisher}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tahun Terbit"
              name="published"
              value={published}
              onChange={handleChange}
            />
            <TextField
              name="category"
              select
              label="Pilih kategori buku"
              value={category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {['Buku Fiksi', 'Buku Pengetahuan (Non paket)', 'Kamus', 'Ensiklopedia', 'Al-Quran Tafsir', 'Buku Paket'].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Upload Gambar Sampul Buku</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
          </Box>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="w-full md:w-auto"
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onClose}
              className="w-full md:w-auto"
            >
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateBook;
