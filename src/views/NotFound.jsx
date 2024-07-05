import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate
import warning from '../assets/404/warning.png'
import { Button } from '@mui/material';

function PageNotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/'); 
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <img src={warning} alt="Not found page" className="w-64 h-64 mx-auto mb-8" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">404 Page Not Found</h1>
                <Button 
                    variant="outlined" 
                    color="error" 
                    className="mt-4"
                    onClick={handleClick} 
                >
                    Kembali
                </Button>
            </div>
        </div>
    );
}

export default PageNotFound;
