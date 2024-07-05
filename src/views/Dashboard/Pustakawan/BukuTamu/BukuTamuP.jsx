import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../../../components/Dashboard/Pustakawan/NavbarPustakawan';
import Sidebar from '../../../../components/Dashboard/Pustakawan/SidebarPustakawan';
import axios from "axios";
import Swal from "sweetalert2";
import Chart from 'chart.js/auto';
import { Button, Table, Pagination, Space, Select, Form, Input } from "antd";
import { IoPeopleSharp } from "react-icons/io5";
import './UpdateTamu'
import './bukutamu.scss';

const BukuTamu = ({ type }) => {

  document.title = "Dashboard Pustakawan - Buku Tamu";
  const [guestsToday, setGuestsToday] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const chartRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [form] = Form.useForm();
  const [totalGuests, setTotalGuests] = useState(0);
  const pageSize = 10;
  const nameInputRef = useRef(null);

  const identityRef = useRef(null);

  useEffect(() => {
    fetchGuestsToday();
    createChart();
  }, [page]);

  useEffect(() => {
    nameInputRef.current && nameInputRef.current.focus();
  }, []);  

  const fetchGuestsToday = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/guestbook/", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        params: {
          page: page,
        },
      });

      if (response.data.success) {
        if (response.data.data && Array.isArray(response.data.data.data)) {
          setGuestsToday(response.data.data.data);
          setTotalGuests(response.data.data.total);
        } else {
          console.error("Data received is not in the expected format:", response.data.data);
        }
      } else {
        console.error("Failed to fetch guests data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching guests data:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://127.0.0.1:8000/api/guestbook/create", values, config);
      form.resetFields();
      fetchGuestsToday();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengguna berhasil ditambahkan!",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.email[0],
        });
      } else {
        console.error("Error adding user:", error);
      }
    }
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Yakin Mau Hapus?",
        text: "Data akan dihapus dari database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus saja!",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/guestbook/${id}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        fetchGuestsToday();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredGuests = guestsToday.filter((guest) =>
    guest.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const data = {
    labels: ['Bulan Ini', 'Bulan Kemarin', 'Hari Ini'],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      aspectRatio: 1.6,
      maintainAspectRatio: true,
    },
  };

  const createChart = () => {
    if (chartRef && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(chartRef.current, config);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSummary = () => {
    console.log("Tombol Rekapitulasi Pengunjung diklik");
  };

  const handleEdit = (guestId) => {
    setSelectedGuestId(guestId);
    setIsModalOpen(true);
  };

  const [goalOptions, setGoalOptions] = useState([
    { label: "Membaca Buku", value: "Membaca Buku" },
    { label: "Meminjam Buku", value: "Meminjam Buku" },
    { label: "Mengerjakan Tugas", value: "Mengerjakan Tugas" },
    { label: "Diskusi", value: "Diskusi" },
  ]);

  const handleGoalChange = (value) => {
    setSelectedGoal(value);
  };

  const handleAddGuest = () => {
    identityRef.current.scrollIntoView({ behavior: "smooth" });
  };  

  return (
    <div className="list_page">
      <div className="home_sidebar">
        <Sidebar />
      </div>

      <div className="list_page_main">
        <Navbar />
        <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
              Buku Tamu
            </h1>
          </div>

          <div ref={identityRef} className="mt-8 flex space-x-8">
            <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
              <h1 className="font-semibold mb-4 text-xl text-center">Tambah Identitas Pengunjung</h1>
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item name="name" rules={[{ required: true, message: 'Nama Pengunjung harus diisi!' }]}>
                  <Input placeholder="Nama Pengunjung" />
                </Form.Item>
                <Form.Item name="class">
                  <Input placeholder="Kelas" />
                </Form.Item>
                <Form.Item name="departemen">
                  <Input placeholder="Jurusan" />
                </Form.Item>
                <Form.Item name="email" rules={[{ type: 'email', message: 'Email tidak valid!' }]}>
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="goals">
                  <Select
                    placeholder="Pilih Tujuan"
                    options={goalOptions}
                    onChange={handleGoalChange}
                  />
                </Form.Item>
                <Form.Item name="telp">
                  <Input placeholder="No Handphone" />
                </Form.Item>
                <div className="flex justify-end">
                  <Button type="primary" htmlType="submit" className="w-full bg-blue-500">
                    Simpan Data
                  </Button>
                </div>
              </Form>
            </div>

            <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Statistik Pengunjung</h2>
              <div className="grid grid-cols-2 gap-4">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl text-start font-semibold mb-4 text-blue-400 flex items-center">
              <IoPeopleSharp className="mr-2 text-blue-400" /> Daftar Tamu
            </h1>
            
            <div className="flex items-center mb-4">
              <Input 
                type="text" 
                placeholder="Cari data tamu berdasarkan nama..." 
                value={searchKeyword} 
                onChange={(e) => setSearchKeyword(e.target.value)} 
                className="border p-2 rounded-md mr-10" 
              />
              <div className="flex justify-end flex-grow">
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    onClick={handleAddGuest}
                    className="bg-blue-500"
                  >
                    Tambah Tamu
                  </Button>
                </div>
              </div>
            </div>
            <Table
              dataSource={filteredGuests.map((guest, index) => ({
                ...guest,
                key: (page - 1) * pageSize + index + 1,
              }))}
              pagination={false}
            >
              <Table.Column title="No" dataIndex="key" />
              <Table.Column title="Nama Pengunjung" dataIndex="name" />
              <Table.Column title="Kelas" dataIndex="class" />
              <Table.Column title="Jurusan" dataIndex="departemen" />
              <Table.Column title="Email" dataIndex="email" />
              <Table.Column title="Tujuan" dataIndex="goals" />
              <Table.Column title="No Handphone" dataIndex="telp" />
              <Table.Column
                title="Aksi"
                render={(text, record) => (
                  <Space>
                    <Button type="primary" shape="round" className="bg-blue-500" onClick={() => handleEdit(record.id)}>Edit</Button>
                    <Button danger shape="round" onClick={() => handleDelete(record.id)}>Delete</Button>
                  </Space>
                )}
              />
            </Table>
            <Pagination
              className="mt-5"
              current={page}
              total={totalGuests}
              pageSize={pageSize}
              onChange={(page) => setPage(page)}
            />
            {isModalOpen && (
              <UpdateTamu userId={selectedGuestId} onClose={() => setIsModalOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BukuTamu;
