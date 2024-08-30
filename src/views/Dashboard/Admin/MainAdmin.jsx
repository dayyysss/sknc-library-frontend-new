import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegChartBar, FaStickyNote, FaBook, FaUser, FaEllipsisV } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function MainAdmin() {
  document.title = "Dashboard Admin";

  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPeminjaman, setTotalPeminjaman] = useState(0);
  const [totalPengembalian, setTotalPengembalian] = useState(0);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBook = await axios.get('http://127.0.0.1:8000/api/book/', {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setTotalBooks(responseBook.data.data.total);

        const responseUser = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setTotalUsers(responseUser.data.data.total);

        const responsePeminjaman = await axios.get('http://127.0.0.1:8000/api/borrow/', {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setTotalPeminjaman(responsePeminjaman.data.data.total);

        const responsePengembalian = await axios.get('http://127.0.0.1:8000/api/restore/', {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setTotalPengembalian(responsePengembalian.data.data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  useEffect(() => {
    const dummyData = [
      { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Mei", uv: 1890, pv: 4800, amt: 2181 }, 
      { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Agu", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Sep", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Okt", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Des", uv: 3490, pv: 4300, amt: 2100 },
    ];
    setDatas(dummyData);
  }, []);

  return (
      <div className="pt-[25px] bg-[#F8F9FC] pb-[40px] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Dashboard Admin
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
          <Link to="/dashboard-admin/manajemen-user" className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
                JUMLAH USER
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {totalUsers} 
              </h1>
            </div>
            <FaUser fontSize={28} />
          </Link>
          <Link to="/dashboard-admin/buku" className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                JUMLAH BUKU
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {totalBooks}
              </h1>
            </div>
            <FaBook fontSize={28} />
          </Link>
          <Link to="/dashboard-admin/peminjaman" className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#c81c1c] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                JUMLAH PEMINJAMAN
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {totalPeminjaman}
              </h1>
            </div>
            <FaStickyNote fontSize={28} />
          </Link>
          <Link to="/dashboard-admin/pengembalian" className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#fcff5b] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                JUMLAH PENGEMBALIAN
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {totalPengembalian}
              </h1>
            </div>
            <FaRegChartBar fontSize={28} />
          </Link>
        </div>
        <div className="flex mt-[22px] w-full gap-[15px]">
          <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
              <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
                Grafik Peminjaman
              </h2>
              <FaEllipsisV color="gray" className="cursor-pointer" />
            </div>
            <div className="w-full">
              <LineChart width={1350} height={500} data={datas} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="peminjaman" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MainAdmin;
