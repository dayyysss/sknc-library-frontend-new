import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, Upload } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;

const AddUserModal = ({ onClose, refreshData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = async (values) => {
    const token = getAuthToken();
    if (!token) {
      console.error("Token not available. Please login.");
      return;
    }

    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    fileList.forEach(file => {
      formData.append('image', file.originFileObj);
    });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("http://127.0.0.1:8000/api/user/create", formData, config);
      onClose();
      refreshData();
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

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  return (
    <Modal
      title="Tambah Pengguna"
      visible={true}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          roles: "",
        }}
      >
        <Form.Item
          name="name"
          label="Nama"
          rules={[{ required: true, message: 'Nama diperlukan' }]}
        >
          <Input placeholder="Nama" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Email diperlukan' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Kata Sandi"
          rules={[{ required: true, message: 'Kata Sandi diperlukan' }]}
        >
          <Input.Password placeholder="Kata Sandi" />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          label="Konfirmasi Kata Sandi"
          rules={[{ required: true, message: 'Konfirmasi Kata Sandi diperlukan' }]}
        >
          <Input.Password placeholder="Konfirmasi Kata Sandi" />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Peran"
          rules={[{ required: true, message: 'Peran diperlukan' }]}
        >
          <Select placeholder="Pilih Peran">
            <Option value="pustakawan">Pustakawan</Option>
            <Option value="anggota">Anggota</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label="Foto Profil"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button>Upload Foto</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Tambah Pengguna
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
