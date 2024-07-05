import React, { useState } from 'react';
import { FaSearch, FaEnvelope, FaRegBell, FaUserCircle } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const DashboardNav = () => {
    const [open, setOpen] = useState(false);

    const showProfile = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Hapus token dari local storage
            localStorage.removeItem("token");
            // Tampilkan pemberitahuan logout berhasil di tengah layar
            toast.success("Logout berhasil!", {
                position: "top-center",
            });
            // Tunda pengalihan ke halaman login setelah 2 detik
            setTimeout(() => {
                window.location.href = "/";
            }, 2000); // Ubah angka 2000 menjadi jumlah milidetik yang Anda inginkan
        } catch (error) {
            toast.error("Logout gagal!", {
                position: "top-center",
            });
        }
    };
    
    return (
        <div className=''>
            <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px] '>
                <div className='flex items-center rounded-[5px]'>
                    <input type="text" className=' bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...' />
                    <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                        <FaSearch color='white' />
                    </div>
                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                        {/* <FaRegBell />
                        <FaEnvelope /> */}
                    </div>
                    <div className='flex items-center gap-[15px] relative' onClick={showProfile} >
                        <p>Admin</p>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40' >
                            <FaUserCircle color='white' size={40} />
                        </div>
                        {open &&
                            <div className='bg-white border h-[40px] w-[150px] absolute bottom-[-70px] z-20 right-0 pt-[5px] pl-[5px] space-y-[10px]'>
                                <p className='cursor-pointer hover:text-[blue] font-semibold text-center' onClick={handleLogout}>Logout</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
