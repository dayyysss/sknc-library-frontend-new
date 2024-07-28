import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../../components/Dashboard/Pustakawan/DataTable/DataTable";
import TableList from "../../../../components/Dashboard/Pustakawan/DataBuku/DataBuku";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import "./BooksList.scss";

function BooksList({ type }) {
  return (
    <>
        {/* mui data table */}
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
              <Link
                to="#"
                style={{ textDecoration: "none" }}
              >
                  <button className="import-excel-btn">
                <PiMicrosoftExcelLogoLight className="excel-icon" />
                Import Excel
              </button>
              </Link>
              </div>
            </div>
          </div>
          {type === "book" ? <DataTable /> : <TableList />}
        </div>
        </>
  );
}

export default BooksList;
