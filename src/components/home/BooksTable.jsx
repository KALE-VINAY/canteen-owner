import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from 'notistack';
import apiClient from "../../utils/apiClient";
import { useEffect } from "react";

const BooksTable = ({ books, onToggleStatus }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [localBooks, setLocalBooks] = useState(books || []);
  console.log("Books received in BooksTable:", books); // Log to check the structure
  // const handleStatusToggle = async (bookId) => {
  //   // Find the current book
  //   const bookToUpdate = localBooks.find(book => book._id === bookId);
    
  //   // Determine new status
  //   const newStatus = bookToUpdate.statusshop === "Open" ? "Closed" : "Open";

  //   try {
  //     // Send PUT request to update status
  //     const response = await axios.put(`https://shop-status-zenu.onrender.com/books/${bookId}`, {
  //       ...bookToUpdate,
  //       statusshop: newStatus
  //     });

  //     // Update local state
  //     const updatedBooks = localBooks.map(book => 
  //       book._id === bookId 
  //         ? { ...book, statusshop: newStatus } 
  //         : book
  //     );
      
  //     setLocalBooks(updatedBooks);

  //     // Show success notification
  //     enqueueSnackbar(`Shop status updated to ${newStatus}`, { variant: 'success' });

  //     // Call parent component's update function if provided
  //     if (onToggleStatus) {
  //       onToggleStatus(bookId, newStatus);
  //     }
  //   } catch (error) {
  //     console.error("Error updating book status:", error);
  //     enqueueSnackbar('Failed to update status', { variant: 'error' });
  //   }
  // };
  const handleStatusToggle = async (bookId) => {
    const bookToUpdate = localBooks.find((book) => book._id === bookId);
    const newStatus = bookToUpdate.statusshop === "Open" ? "Closed" : "Open";
  
    try {
      const response = await apiClient.put(`/books/${bookId}`, {
        ...bookToUpdate,
        statusshop: newStatus,
      });
  
      // Update local state
      const updatedBooks = localBooks.map((book) =>
        book._id === bookId
          ? { ...book, statusshop: newStatus }
          : book
      );
  
      setLocalBooks(updatedBooks);
  
      // Show success notification
      enqueueSnackbar(`Shop status updated to ${newStatus}`, { variant: 'success' });
  
      if (onToggleStatus) {
        onToggleStatus(bookId, newStatus);
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      enqueueSnackbar('Failed to update status', { variant: 'error' });
    }
  };
  
  useEffect(() => {
    setLocalBooks(books); // Update the localBooks state when props change
  }, [books]);


  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          {/* <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th> */}
          <th className="border border-slate-600 rounded-md">Status</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {localBooks.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            {/* <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td> */}
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex items-center justify-center">
                {/* Toggle Button */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={book.statusshop === "Open"}
                    onChange={() => handleStatusToggle(book._id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-500"></div>
                  <span
                    className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full 
                    transition-transform duration-200 transform peer-checked:translate-x-5"
                  ></span>
                </label>
                <span className="ml-2 font-semibold">
                  {book.statusshop}
                </span>
              </div>
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;