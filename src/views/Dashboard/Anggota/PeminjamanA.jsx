import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import LayoutAnggota from '../../../layouts/Dashboard/AnggotaLayout'

const PeminjamanA = () => {
    document.title = "Skanic Library - Peminjaman Buku";

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);

    const fetchData = async () => {
        try {
            const token = getAuthToken();
            const user_id = getUserId();
            if (!token || !user_id) {
                console.error("Token or user_id not available. Please login.");
                return;
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/api/borrow/${user_id}/index-borrow`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: page + 1,
                        per_page: rowsPerPage,
                    },
                }
            );

            const dataPeminjaman = response.data.data; // Ambil data dari kunci 'data'
            setData(dataPeminjaman);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    const getUserId = () => {
        return localStorage.getItem("user_id");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <LayoutAnggota>
        <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[500px]">
            <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
                Buku Yang Di Pinjam
            </h1>

            <TableContainer component={Paper} className="table_list mt-7">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">No</TableCell>
                            <TableCell className="table_cell">Buku</TableCell>
                            <TableCell className="table_cell">Peminjaman Awal</TableCell>
                            <TableCell className="table_cell">Peminjaman Berakhir</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((borrow, index) => (
                                <TableRow key={index}>
                                    <TableCell className="table_cell">{index + 1 + page * rowsPerPage}</TableCell>
                                    <TableCell className="table_cell">{borrow.book.title}</TableCell>
                                    <TableCell className="table_cell">{borrow.borrowing_start}</TableCell>
                                    <TableCell className="table_cell">{borrow.borrowing_end}</TableCell>
                                    <TableCell className="table_cell">
                                        <span
                                            className={`text-white px-3 rounded-full p-1 ${borrow.status === "Menunggu"
                                                ? "bg-yellow-500"
                                                : borrow.status === "Diterima"
                                                    ? "bg-green-500"
                                                    : borrow.status === "Selesai"
                                                        ? "bg-blue-500"
                                                        : ""
                                                }`}
                                        >
                                            {borrow.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Tidak ada data peminjaman.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={Array.isArray(data) ? data.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
        </LayoutAnggota>
    );
};

export default PeminjamanA;
