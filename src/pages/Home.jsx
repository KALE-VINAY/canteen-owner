import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import apiClient from '../utils/apiClient';
import Mainheader from '../components/Mainheader';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get('https://shop-status-zenu.onrender.com/books')
  //     .then((response) => {
  //       setBooks(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/books') // Backend route for fetching books
      .then((response) => {
        // console.log('API Response:', response.data.data);  // Log the API response

        setBooks(response.data.data); // Handle the response data
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleToggleStatus = (bookId, newStatus) => {
    const updatedBooks = books.map((book) =>
      book._id === bookId ? { ...book, statusshop: newStatus } : book
    );
    setBooks(updatedBooks);
  };
  

  return (
    <div className='p-4'>
      <Mainheader/>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' 
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Hostels TU</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} onToggleStatus={handleToggleStatus} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
