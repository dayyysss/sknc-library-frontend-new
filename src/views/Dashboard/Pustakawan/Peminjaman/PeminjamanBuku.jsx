/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../../../components/Dashboard/Pustakawan/DataTable/DataTable';
import Navbar from '../../../../components/Dashboard/Pustakawan/NavbarPustakawan';
import Sidebar from '../../../../components/Dashboard/Pustakawan/SidebarPustakawan';
import PeminjamanBukuP from '../../../../components/Dashboard/Pustakawan/Peminjaman/PeminjamanBukuP';
import './Peminjaman.scss';

function PeminjamanBuku({ type }) {
    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */}
                <div className="data_table">
                    <div className="btnn">
                    </div>

                    {type === 'user' ? <DataTable /> : <PeminjamanBukuP />}
                </div>
            </div>
        </div>
    );
}

export default PeminjamanBuku;
