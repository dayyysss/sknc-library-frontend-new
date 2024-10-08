import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataBuku.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import UpdateBook from './UpdateBook';

function DataBuku() {
    document.title = "Skanic Library - Data Buku";
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/book?page=${page}&limit=${rowsPerPage}`,
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

    const handleUpdate = (book) => {
        setIsModalOpen(true);
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className="pb-20">
            <div className="flex items-center justify-between mb-4 mt-4">
                <TextField
                    label="Cari data buku..."
                    variant="outlined"
                    size="small"
                    className="mr-4"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <p className="mt-4 text-right font-thin">Total Buku: {totalBooks}</p>
            </div>
            {filteredBooks.length === 0 && (
                <Alert variant="outlined" severity="warning">
                    Tidak ada data buku yang tersedia!
                </Alert>
            )}
            <div className="overflow-x-auto">
                <TableContainer component={Paper} className="min-w-full">
                    <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {[
                                    'No', 'Judul Buku', 'Sinopsis', 'ISBN', 'Penulis', 'Jumlah Halaman', 
                                    'Stok Buku', 'Penerbit', 'Tahun Terbit', 'Kategori', 'Sampul Buku', 
                                    'Status', 'Aksi'
                                ].map(header => (
                                    <TableCell key={header} className="table_cell px-4 py-2 text-nowrap">
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBooks.map((book, index) => (
                                <TableRow key={book.id}>
                                    <TableCell component="th" scope="row" className="table_cell px-4 py-2 text-nowrap">
                                        {(page - 1) * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.title}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.synopsis}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.isbn}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.writer}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.page_amount}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.stock_amount}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.publisher}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.published}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap truncate">
                                        {book.category}
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap">
                                        <img src={book.image} alt={book.title} className='w-auto h-auto mx-auto object-cover' />
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap">
                                        <span className={`rounded-full p-2 text-white ${book.stock_amount > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {book.stock_amount > 0 ? 'Tersedia' : 'Habis'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="table_cell px-4 py-2 text-nowrap">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleUpdate(book)}
                                                style={{ minWidth: '75px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(book.id)}
                                                style={{ minWidth: '75px' }}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={13}
                                    count={totalBooks}
                                    rowsPerPage={rowsPerPage}
                                    page={page - 1}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>

            {/* Modal for updating book */}
            {selectedBook && (
                <UpdateBook
                    book={selectedBook}
                    fetchBooks={fetchData}
                    onClose={handleCloseModal}
                    open={isModalOpen}
                />
            )}
        </div>
    );
};

export default DataBuku;
