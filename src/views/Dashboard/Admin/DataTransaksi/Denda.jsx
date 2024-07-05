import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function DendaCompo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCalculateFine = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/restore/${id}/check-fine`);
            if (response.data.message === 'Denda berhasil dihitung.') {
                alert(`Denda berhasil dihitung: Rp ${response.data.fine}`);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error calculating fine:', error);
            alert('Error calculating fine. Please try again later.');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'age', headerName: 'Age', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <div className="actionn">
                    <button
                        type="button"
                        className="calculate_fine_btn"
                        onClick={() => handleCalculateFine(params.row.id)}
                    >
                        Calculate Fine
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className='px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Denda</h1>
            </div>
            <div className="data_table mt-5">
                <DataGrid
                    className="data_grid"
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default DendaCompo;
