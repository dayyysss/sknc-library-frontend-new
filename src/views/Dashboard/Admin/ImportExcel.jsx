// ImportExcel.jsx
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ImportExcel = ({ onClose, refreshData }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (file) => {
    if (!file) {
      message.error('Please select a file');
      return;
    }

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      !file.name.endsWith(".csv")
    ) {
      message.error('File must be in Excel format (XLSX or XLS) or CSV format');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Token not found. Please log in.');
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/import-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success('Data pengguna berhasil diimport!');
        refreshData();
        onClose();
      } else {
        message.error('Import failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        message.error(`Import failed: ${error.response.data.message}`);
      } else if (error.request) {
        message.error('No response from server. Please try again.');
      } else {
        message.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCancel = () => {
    onClose();
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    customRequest: ({ file, onSuccess, onError }) => {
      handleUpload(file)
        .then(() => onSuccess())
        .catch(err => onError(err));
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: false,
  };

  return (
    <Modal
      title="Import Data Menggunakan Excel"
      visible={true}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={() => handleUpload(fileList[0]?.originFileObj)}>
          Unggah
        </Button>
      ]}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Klik atau seret file ke area ini untuk mengunggah</p>
        <p className="ant-upload-hint">
        File mungkin dikompresi (gzip, zip) atau tidak terkompresi. Nama file yang dikompresi harus diakhiri dengan .[format].[kompresi]. Contoh: .xlsx .xls .csv
        </p>
      </Dragger>
    </Modal>
  );
};

export default ImportExcel;
