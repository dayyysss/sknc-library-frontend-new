import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../../components/Dashboard/Pustakawan/DataTable/DataTable";
import TableList from "../../../../components/Dashboard/Pustakawan/DataBuku/DataBuku";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import axios from "axios";
import Swal from "sweetalert2";
import "./BooksList.scss";
import ImportBook from "./ImportBook";

const BooksList = ({ type }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImportExcel = () => {
    setIsImportModalOpen(true);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  const exportAll = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/allbook/export", {
        responseType: "blob",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatbook.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          title: "Sukses!",
          text: "Data Buku Berhasil DiExport!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: "Data Buku Gagal Di Export",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Export error:", error);
      });
  };

  return (
    <>
      <div className="data_table p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
              Data Buku
            </h1>
          </div>
          <div className="btnn">
            <div className="buttons-container">
              <Link
                to="/dashboard-pustakawan/data-buku/tambah-buku/"
                style={{ textDecoration: "none" }}
              >
                <button type="button" className="mr-3">Tambah {type}</button>
              </Link>
              <button
                className="export-excel-btn mr-3"
                onClick={exportAll}
              >
                <PiMicrosoftExcelLogoLight className="excel-icon"/>
                Export Excel
              </button>
              <button
              onClick={handleImportExcel}
              className="import-excel-btn mr-3"
              >
              <PiMicrosoftExcelLogoLight className="excel-icon" />
              Import Excel
              </button>
            </div>
          </div>
        </div>
        {type === "book" ? <DataTable /> : <TableList />}
      </div>

      {/* Modal untuk import */}
      {isImportModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ImportBook onClose={handleCloseImportModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default BooksList;
