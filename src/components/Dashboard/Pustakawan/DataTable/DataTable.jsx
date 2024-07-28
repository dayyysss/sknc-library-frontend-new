import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function DataTable() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null); 
  
    useEffect(() => {
      fetchData();
    }, [page]);
  
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
  
    const handleUpdate = async (bookId) => {
      setIsModalOpen(true);
      setSelectedBook(bookId); 
    };
  
    const handleChangePage = (event, value) => {
      setPage(value);
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      setPage(1);
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'title',
            headerName: 'Nama Buku',
            width: 200,
        },
        {
            field: 'synopsis',
            headerName: 'Sinopsis',
            width: 200,
        },
        {
            field: 'isbn',
            headerName: 'ISBN',
            width: 120,
        },
        {
            field: 'writer',
            headerName: 'Penulis',
            width: 150,
        },
        {
            field: 'page_amount',
            headerName: 'Jumlah Halaman',
            width: 150,
        },
        {
            field: 'stock_amount',
            headerName: 'Stok Buku',
            width: 120,
        },
        {
            field: 'published',
            headerName: 'Tahun Terbit',
            width: 140,
        },
        {
            field: 'category',
            headerName: 'Kategori',
            width: 150,
        },
        {
            field: 'image',
            headerName: 'Sampul Buku',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.row.image}
                    alt={params.row.title}
                    style={{ width: 100, height: 120 }}
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
        },
        {
            field: 'aksi',
            headerName: 'Aksi',
            width: 160,
            renderCell: (params) => (
                <div>
                    <button onClick={() => handleUpdate(params.row.id)}>Edit</button>
                    <button onClick={() => handleDelete(params.row.id)}>Delete</button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={books} columns={columns} pageSize={5} />
        </div>
               
    );
}

export default DataTable;
