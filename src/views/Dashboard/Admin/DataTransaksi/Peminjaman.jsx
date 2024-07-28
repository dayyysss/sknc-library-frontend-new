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
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { FaFilePdf } from "react-icons/fa";
import AddPeminjaman from "./AddPengembalian";
import GeneratePdf from "../../GeneratePdfPeminjaman"

const PeminjamanCompo = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchKeyword]);

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/borrow/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          per_page: rowsPerPage,
          q: searchKeyword,
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

  const handleAccept = async (id) => {
    try {
      console.log("Accepting borrow with id:", id);
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/borrow/${id}/update-status`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      Swal.fire({
        title: "Success!",
        text: "Status peminjaman berhasil diubah menjadi Sukses.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating status peminjaman:", error);
    }
  };

  const handleDetail = (borrow) => {
    const updatedBorrow = { ...borrow };
    console.log("borrowing_start:", updatedBorrow.borrowing_start);
    console.log("borrowing_end:", updatedBorrow.borrowing_end);

    const deadline = new Date(updatedBorrow.borrowing_end);
    const borrowingStart = new Date(updatedBorrow.borrowing_start);

    if (isNaN(deadline.getTime()) || isNaN(borrowingStart.getTime())) {
      console.error("Invalid date value for borrowing_start or borrowing_end");
      return;
    }

    const currentDate = new Date();

    const differenceInDays = Math.ceil((deadline - currentDate) / (1000 * 60 * 60 * 24));

    const newDeadline = new Date(deadline);
    newDeadline.setDate(deadline.getDate() - differenceInDays);

    updatedBorrow.deadline = newDeadline.toISOString().slice(0, 10);

    setSelectedBorrow(updatedBorrow);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedBorrow(null);
    setIsDetailModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleGeneratePdfModalOpen = () => {
    setIsGenerateModalOpen(true);
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
        await axios.delete(`http://127.0.0.1:8000/api/borrow/${id}`, {
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
      console.error("error hapus peminjaman:", error);
    }
  };

  const filteredBorrow = books.filter((borrow) =>
    borrow.user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    borrow.book.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleGeneratePdfModalClose = () => {
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Peminjaman Buku
          </h1>
        </div>
        <div className="flex items-center">
          <TextField
            label="Cari data user..."
            variant="outlined"
            size="small"
            className="searchKeyword-4 px-4 py-2 mr-4 rounded"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleGeneratePdfModalOpen}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 ml-4 flex items-center"
          >
            <FaFilePdf className="mr-2" />
            Cetak Peminjaman
          </button>
          {/* <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 ml-4"
          >
            Tambah Peminjaman
          </button> */}
        </div>
      </div>
      <TableContainer component={Paper} className="table_list mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">No</TableCell>
              <TableCell className="table_cell">Nama Peminjam</TableCell>
              <TableCell className="table_cell">Judul Buku</TableCell>
              <TableCell className="table_cell">Peminjaman Awal</TableCell>
              <TableCell className="table_cell">Tenggat</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBorrow.map((borrow, index) => (
              <TableRow key={borrow.id}>
                <TableCell className="table_cell"> {(page - 1) * 10 + index + 1}</TableCell>
                <TableCell className="table_cell">{borrow.user.name}</TableCell>
                <TableCell className="table_cell">{borrow.book.title}</TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_start}
                </TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_end}
                </TableCell>
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
                <TableCell className="table_cell">
                  <div className="flex space-x-2">
                    {borrow.status === "Menunggu" && (
                      <Button
                        onClick={() => handleAccept(borrow.id)}
                        variant="contained"
                        color="success"
                        className="px-2 py-2"
                      >
                        Terima
                      </Button>
                    )}
                    {borrow.status === "Diterima" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDetail(borrow)}
                      >
                        Detail
                      </Button>
                    )}
                    {borrow.status === "Menunggu" && (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled
                      >
                        Detail
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(borrow.id)}
                      variant="contained"
                      color="error"
                      className="px-4 py-2 order-last"
                    >
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Tidak ada data peminjaman.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={12}
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
      {isAddModalOpen && <AddPeminjaman closeModal={closeAddModal} />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDetailModalOpen}>
          <div className="fixed inset-0 flex items-center justify-center" onClick={handleCloseDetailModal}>
            <div className="bg-white p-10 rounded-lg w-[30%]" onClick={(e) => e.stopPropagation()}>
              <Button variant="outlined" onClick={handleCloseDetailModal} className="absolute top-[-15px] right-[-5px] text-gray-500 hover:text-gray-700 focus:outline-none">
                Kembali
              </Button>
              <h2 className="text-xl font-bold mb-4">Detail Peminjaman</h2>
              {selectedBorrow && (
                // flex 1
                <div className=" md:flex-row">
                  <div className="md:w-1/2 flex ">
                    <div className="bg-gray-100 p-4 rounded-md mb-4 ">
                      <p className="text-sm font-semibold">Nama Peminjam:</p>
                      <p>{selectedBorrow.user.name}</p>
                      <p className="text-sm font-semibold">Email:</p>
                      <p>{selectedBorrow.user.email}</p>
                      <p className="text-sm font-semibold">Status User:</p>
                      <p>{selectedBorrow.user.status}</p>
                    </div>
                    <div className="md:w-1/2 md:ml-8">
                      <div className="bg-gray-100 p-4 rounded-md mb-4 w-[200px] pb-[50px]">
                        <p className="text-sm font-semibold">Judul Buku:</p>
                        <p>{selectedBorrow.book.title}</p>
                        <p className="text-sm font-semibold">Pengarang:</p>
                        <p>{selectedBorrow.book.writer}</p>
                        <p className="text-sm font-semibold">Tahun Terbit:</p>
                        <p>{selectedBorrow.book.published}</p>
                      </div>
                    </div>
                  </div>
                  {/* flex 2 */}
                  <div className="md:w-1/2 flex">
                    <div className="bg-gray-100 p-4 pl-[70px] rounded-md mb-4 text-left">
                      <p className="text-sm font-semibold">Status:</p>
                      <p className="rounded-full p-1 bg-green-500 px-4 text-white">{selectedBorrow.status}</p>
                    </div>
                    <div className="md:w-1/2 md:ml-8 text-left">
                      <div className="bg-gray-100 p-4 rounded-md mb-4 w-[200px]">
                        <p className="text-sm font-semibold">Id Peminjaman:</p>
                        <p>{selectedBorrow.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* flex 3 */}
                  <div className="md:w-1/2 flex">
                    <div className="bg-gray-100 p-4 pl-[75px] rounded-md mb-4 text-left">
                      <p className="text-sm font-semibold">Awal Peminjaman:</p>
                      <p>{selectedBorrow.borrowing_start}</p>
                    </div>
                    <div className="md:w-1/2 md:ml-8 text-left">
                      <div className="bg-gray-100 p-4 rounded-md mb-4 w-[200px]">
                        <p className="text-sm font-semibold">Batas Waktu Pengembalian:</p>
                        <p>{selectedBorrow.borrowing_end}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
      {/* Generate PDF Modal */}
      <Modal
        open={isGenerateModalOpen}
        onClose={handleGeneratePdfModalClose}
        aria-labelledby="generate-pdf-modal-title"
        aria-describedby="generate-pdf-modal-description"
        className="flex items-center justify-center"
      >
        <Fade in={isGenerateModalOpen}>
          <div className="modal-content">
            <GeneratePdf
              onClose={handleGeneratePdfModalClose}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PeminjamanCompo;
