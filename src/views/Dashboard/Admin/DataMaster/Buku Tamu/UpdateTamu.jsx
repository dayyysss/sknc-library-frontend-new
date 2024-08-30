import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTamu = ({ userId, onClose, selectedGuest, fetchData }) => {
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    class: "",
    departemen: "",
    email: "",
    goals: "",
    telp: "",
  });

  useEffect(() => {
    if (selectedGuest) {
      setFormData({
        name: selectedGuest.name || "",
        class: selectedGuest.class || "",
        departemen: selectedGuest.departemen || "",
        email: selectedGuest.email || "",
        goals: selectedGuest.goals || "",
        telp: selectedGuest.telp || "",
      });
    }
  }, [selectedGuest]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.goals) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
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
  
      onClose();
      fetchData();    
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
    <Form layout="vertical" onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <Form.Item label="Nama" required>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Kelas">
        <Input name="class" value={formData.class} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Jurusan">
        <Input name="departemen" value={formData.departemen} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Email" required>
        <Input name="email" value={formData.email} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Tujuan" required>
        <Select
          name="goals"
          value={formData.goals}
          onChange={(value) => setFormData({ ...formData, goals: value })}
          options={[
            { label: "Membaca Buku", value: "Membaca Buku" },
            { label: "Meminjam Buku", value: "Meminjam Buku" },
            { label: "Mengerjakan Tugas", value: "Mengerjakan Tugas" },
            { label: "Diskusi", value: "Diskusi" },
          ]}
        />
      </Form.Item>
      <Form.Item label="No Handphone">
        <Input name="telp" value={formData.telp} onChange={handleChange} />
      </Form.Item>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Simpan
        </Button>
        <Button onClick={onClose} style={{ marginLeft: "8px" }}>
          Batal
        </Button>
      </div>
    </Form>
  );
};

export default UpdateTamu;
