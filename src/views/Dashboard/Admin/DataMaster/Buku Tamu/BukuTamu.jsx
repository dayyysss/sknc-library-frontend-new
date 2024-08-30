import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Chart from 'chart.js/auto';
import { Button, Table, Pagination, Space, Select, Form, Input, Modal } from "antd";
import { IoPeopleSharp } from "react-icons/io5";
import UpdateTamu from './UpdateTamu';

const BukuTamu = (userId, onClose, selectedGuestFromProps, fetchData) => {
  document.title = "Dashboard Admin - Buku Tamu";
  const [guestsToday, setGuestsToday] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const chartRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [form] = Form.useForm();
  const [totalGuests, setTotalGuests] = useState(0);
  const pageSize = 10;
  const identityRef = useRef(null);

  useEffect(() => {
    fetchGuestsToday();
  }, [page]);

  useEffect(() => {
    if (guestsToday.length > 0) {
      createChart();
    }
  }, [guestsToday]);

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

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setSelectedGuestId(guest.id);
    setIsModalOpen(true);
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    // Hapus chart lama jika sudah ada
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chartRef.current.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Membaca Buku', 'Meminjam Buku', 'Mengerjakan Tugas', 'Diskusi'],
        datasets: [{
          label: 'Jumlah Pengunjung',
          data: [
            guestsToday.filter(guest => guest.goals === 'Membaca Buku').length,
            guestsToday.filter(guest => guest.goals === 'Meminjam Buku').length,
            guestsToday.filter(guest => guest.goals === 'Mengerjakan Tugas').length,
            guestsToday.filter(guest => guest.goals === 'Diskusi').length
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  };

  const handleAddGuest = () => {
    identityRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC] overflow-auto">
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
                  options={[
                    { label: "Membaca Buku", value: "Membaca Buku" },
                    { label: "Meminjam Buku", value: "Meminjam Buku" },
                    { label: "Mengerjakan Tugas", value: "Mengerjakan Tugas" },
                    { label: "Diskusi", value: "Diskusi" },
                  ]}
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
          <div style={{ overflowX: 'auto' }}>
          <Table
              dataSource={filteredGuests.map((guest, index) => ({
                ...guest,
                key: (page - 1) * pageSize + index + 1,
              }))}
              pagination={false}
              style={{ minWidth: 800 }} 
            >
               <Table.Column title="No" dataIndex="key" />
              <Table.Column title="Nama" dataIndex="name" />
              <Table.Column title="Kelas" dataIndex="class" />
              <Table.Column title="Jurusan" dataIndex="departemen" />
              <Table.Column title="Email" dataIndex="email" />
              <Table.Column title="Tujuan" dataIndex="goals" />
              <Table.Column title="No Handphone" dataIndex="telp" />
              <Table.Column
                title="Aksi"
                render={(text, record) => (
                  <Space>
                    <Button type="primary" shape="round" className="bg-blue-500" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger shape="round" onClick={() => handleDelete(record.id)}>Delete</Button>
                  </Space>
                )}
              />
            </Table>
          </div>

          <Pagination
            className="mt-5"
            current={page}
            total={totalGuests}
            pageSize={pageSize}
            onChange={(page) => setPage(page)}
          />

          {isModalOpen && (
            <Modal
              title="Update Tamu"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              <UpdateTamu
                userId={selectedGuestId}
                selectedGuest={selectedGuest}
                onClose={() => setIsModalOpen(false)}
                fetchData={fetchGuestsToday}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default BukuTamu;
