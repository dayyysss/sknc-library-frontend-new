import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const DendaA = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        document.title = "Skanic Library - Denda";
        fetchData();
    }, [page, rowsPerPage]);

    const fetchData = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                console.error("Token not available. Please login.");
                return;
            }
    
            const response = await axios.get(
                "http://127.0.0.1:8000/api/book-restore/index-fine",
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
    
            console.log("Response from API:", response.data); // Tambahkan log ini
            const dataDenda = response.data.data;
            setData(Array.isArray(dataDenda) ? dataDenda : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    return (
        <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[500px]">
            <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
                Denda
            </h1>
    
            <TableContainer component={Paper} className="table_list mt-7">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Tanggal Pengembalian</TableCell>
                            <TableCell className="table_cell">Tenggat</TableCell>
                            <TableCell className="table_cell">Status Keterlambatan</TableCell>
                            <TableCell className="table_cell">Judul Buku</TableCell>
                            <TableCell className="table_cell">Denda</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell className="table_cell">{row.returndate}</TableCell>
                                    <TableCell className="table_cell">{row.borrowing_end}</TableCell>
                                    <TableCell className="table_cell">{row.status_keterlambatan}</TableCell>
                                    <TableCell className="table_cell">{row.book_id}</TableCell>
                                    <TableCell className="table_cell">{row.fine}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="table_cell" align="center">No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
    
};

export default DendaA;
