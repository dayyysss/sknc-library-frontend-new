import React from 'react';
import DataTable from '../../../../components/Dashboard/Pustakawan/DataTable/DataTable';
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
