import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateUser = ({ userId, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: null,
  });
  const [error, setError] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
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
    if (!formData.email || !formData.password) {
      setError("Email dan password tidak boleh kosong.");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Email harus berisi karakter @.");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return false;
    }
    return true;
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

      const formDataWithImage = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataWithImage.append(key, formData[key]);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        `http://127.0.0.1:8000/api/user/${userId}/update`,
        formDataWithImage,
        config
      );

      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: 'Data pengguna berhasil diperbarui!',
      });

      onClose();
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
        <h2 className="text-2xl font-bold mb-4 text-center">Memperbarui Pengguna</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kata Sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Konfirmasi Kata Sandi"
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

export default UpdateUser;
