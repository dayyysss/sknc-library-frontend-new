import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const DashboardNav = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(''); // State untuk menyimpan URL gambar profil

    useEffect(() => {
        // Ambil nama pengguna dan URL gambar profil dari API
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, { // Pastikan id didefinisikan atau diperoleh dari state/props
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
                
                const data = await response.json();
                setUsername(data.username); // Asumsi data.username adalah username dari API
                setProfileImage(data.profile_image_url); // Asumsi data.profile_image_url adalah URL gambar profil dari API
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

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

            localStorage.removeItem("token");
            toast.success("Logout berhasil!", {
                position: "top-center",
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 2000); 
        } catch (error) {
            toast.error("Logout gagal!", {
                position: "top-center",
            });
        }
    };
    
    return (
        <div>
            <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>
                <div className='flex items-center rounded-[5px]'>
                    {/* Jika ada elemen tambahan bisa dimasukkan di sini */}
                </div>
                <div className='flex items-center gap-[20px]'>
                    <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                        {/* Tempat untuk ikon notifikasi atau email jika diperlukan */}
                    </div>
                    <div className='flex items-center gap-[15px] relative' onClick={showProfile} >
                        <p>{username || "Admin"}</p> {/* Tampilkan username jika ada, jika tidak tampilkan "Admin" */}
                        <div className='h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative z-40'>
                            {profileImage ? (
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <FaUserCircle color='white' size={40} />
                            )}
                        </div>
                        {open && (
                            <div className='bg-white border w-[150px] absolute bottom-[-70px] z-20 right-0 pt-[5px] pb-[10px] pl-[5px] pr-[5px] space-y-[10px]'>
                                <p className='cursor-pointer hover:text-[blue] font-semibold text-center' onClick={showProfile}>Profile</p>
                                <p className='cursor-pointer hover:text-[blue] font-semibold text-center' onClick={handleLogout}>Logout</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
