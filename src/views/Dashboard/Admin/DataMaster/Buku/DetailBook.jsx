import React, { useRef, useEffect } from 'react';

const DetailBook = ({ book, closeModal }) => {
  const getStatusColor = (stockAmount) => {
    if (stockAmount > 0) {
      return {
        status: 'Tersedia',
        colorClass: 'text-green-600'
      };
    } else {
      return {
        status: 'Tidak Tersedia',
        colorClass: 'text-red-600'
      };
    }
  };

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { status, colorClass } = getStatusColor(book.stock_amount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">{book.title}</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <img src={book.image} alt={book.title} className="h-64 w-auto object-contain mx-auto" />
          </div>
          <div className="md:w-1/2 text-left">
            <p><span className="font-semibold">Synopsis:</span> {book.synopsis}</p>
            <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            <p><span className="font-semibold">Penulis:</span> {book.writer}</p>
            <p><span className="font-semibold">Jumlah Halaman:</span> {book.page_amount}</p>
            <p><span className="font-semibold">Stok Buku:</span> {book.stock_amount}</p>
            <p><span className="font-semibold">Penerbit:</span> {book.publisher}</p>
            <p><span className="font-semibold">Diterbitkan:</span> {book.published}</p>
            <p><span className="font-semibold">Kategori:</span> {book.category}</p>
            <p className="flex items-center"><span className="font-semibold mr-2">Status:</span> <span className={colorClass}>{status}</span></p>
            <div className='mt-4 flex'>
              <button onClick={closeModal} className="bg-gray-500 text-white px-16 py-2 rounded">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
