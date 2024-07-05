import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const GeneratePdf = ({ onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerate = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/borrow/generateBorrowPdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          start_date: startDate,
          end_date: endDate,
        },
        responseType: 'blob', // Important for handling PDF response
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "LaporanPeminjamanBuku.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
      console.log(response.data); // Pastikan ini adalah blob yang valid

      Swal.fire({
        icon: "success",
        title: "PDF Berhasil Dibuat",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Membuat PDF",
        text: error.message,
      });
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Cetak Laporan Peminjaman</h2>
        <TextField
          label="Tanggal Awal"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tanggal Akhir"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <div className="mt-4 flex justify-center space-x-4">
          <Button variant="contained" color="primary" onClick={handleGenerate}>
            Generate PDF
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePdf;
