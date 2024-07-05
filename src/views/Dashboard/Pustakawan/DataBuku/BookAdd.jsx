import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'; // Impor TextField dari Material-UI
import Navbar from '../../../../components/Dashboard/Pustakawan/NavbarPustakawan';
import Sidebar from '../../../../components/Dashboard/Pustakawan/SidebarPustakawan';
import noImage from '../../../../assets/images/uploadimage.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './New.scss';

function BookAdd() {
    const [bookData, setBookData] = useState({
        title: '',
        synopsis: '',
        isbn: '',
        writer: '',
        page_amount: '',
        stock_amount: '',
        publisher: '',
        published: '',
        category: '', // Tambahkan state untuk category
        image: null,
    });

    const [file, setFile] = useState('');
    const navigate = useNavigate(); // Menggunakan useNavigate dari react-router-dom

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setBookData({ ...bookData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('synopsis', bookData.synopsis);
        formData.append('isbn', bookData.isbn);
        formData.append('writer', bookData.writer);
        formData.append('page_amount', bookData.page_amount);
        formData.append('stock_amount', bookData.stock_amount);
        formData.append('publisher', bookData.publisher);
        formData.append('published', bookData.published);
        formData.append('category', bookData.category); // Masukkan category ke formData
        formData.append('image', bookData.image);

        try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/book/create",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${getAuthToken()}`,
                },
              }
            );
      
            if (response.data.success) {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Data Buku berhasil ditambahkan',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                navigate("/dashboard-pustakawan/data-buku"); // Navigate to the new route
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Gagal menambahkan buku',
                showConfirmButton: false,
                timer: 1500
              });
              setErrorMessage("Gagal menambahkan buku");
            }
          } catch (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Terjadi kesalahan saat menambahkan buku',
              showConfirmButton: false,
              timer: 1500
            });
            setErrorMessage("Terjadi kesalahan saat menambahkan buku");
          }
        };

    const getAuthToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not available. Please login.');
            return null;
        }
        return token;
    };

    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user text-center">Tambah Data Buku</p>
                            <img
                                src={file ? URL.createObjectURL(file) : noImage}
                                alt=""
                                onClick={() => document.getElementById('file').click()} // Tambahkan event onClick untuk menampilkan dialog pemilihan file
                                className='cursor-pointer' // Perbaiki typo di sini, seharusnya 'cursor-pointer'
                            />
                            <div className="form_inp mt-10">
                                <label htmlFor="file">
                                    <p className="add_new_sampul text-black text-center">Upload Sampul Buku: <DriveFolderUploadIcon className="file_icon cursor-pointer" /> </p>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <TextField
                                name="title"
                                type="text"
                                label="Masukkan nama buku"
                                onChange={handleChange}
                                value={bookData.title}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="synopsis"
                                type="text"
                                label="Masukkan sinopsis singkat"
                                onChange={handleChange}
                                value={bookData.synopsis}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="isbn"
                                type="text"
                                label="Masukkan no ISBN buku"
                                onChange={handleChange}
                                value={bookData.isbn}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="writer"
                                type="text"
                                label="Masukkan penulis buku"
                                onChange={handleChange}
                                value={bookData.writer}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="page_amount"
                                type="number"
                                label="Masukkan jumlah halaman buku"
                                onChange={handleChange}
                                value={bookData.page_amount}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="stock_amount"
                                type="number"
                                label="Masukkan stok buku"
                                onChange={handleChange}
                                value={bookData.stock_amount}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="publisher"
                                type="text"
                                label="Masukkan penerbit buku"
                                onChange={handleChange}
                                value={bookData.publisher}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="published"
                                type="text"
                                label="Masukkan tahun terbit buku"
                                onChange={handleChange}
                                value={bookData.published}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                name="category"
                                select
                                label="Pilih kategori buku"
                                value={bookData.category}
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
                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAdd;
