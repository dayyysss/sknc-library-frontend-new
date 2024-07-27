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
<>
                {/* mui data table */}
                <div className="data_table">
                    <div className="btnn">
                    </div>

                    {type === 'user' ? <DataTable /> : <PeminjamanBukuP />}
                </div>

</>
    );
}

export default PeminjamanBuku;
