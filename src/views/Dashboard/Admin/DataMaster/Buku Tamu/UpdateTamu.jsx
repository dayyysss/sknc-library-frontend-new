import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateTamu = ({ userId, onClose, user, fetchData }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    departemen: "",
    email: "",
    goals: "",
    telp: "",
  });
  const [error, setError] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        class: user.class || "",
        departemen: user.departemen || "",
        email: user.email || "",
        goals: user.goals || "",
        telp: user.telp || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.goals) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      class: "",
      departemen: "",
      email: "",
      goals: "",
      telp: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(
        `http://127.0.0.1:8000/api/guestbook/${userId}/update`,
        formData,
        config
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data pengguna berhasil diperbarui!',
      });

      resetForm(); // Reset form setelah berhasil update
      onClose();
      fetchData(); // Panggil fungsi fetchData untuk memperbarui data setelah berhasil update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Update Buku Tamu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Pengunjung"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              placeholder="Kelas"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="departemen"
              value={formData.departemen}
              onChange={handleChange}
              placeholder="Jurusan"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Pilih Tujuan</option>
              <option value="membaca buku">Membaca Buku</option>
              <option value="meminjam buku">Meminjam Buku</option>
              <option value="mengerjakan tugas">Mengerjakan Tugas</option>
              <option value="diskusi">Diskusi</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
              placeholder="No Handphone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Perbaharui Pengguna
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTamu;
