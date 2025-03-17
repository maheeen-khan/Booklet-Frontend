import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyLayout from './components/Layout.jsx'
import { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import axios from 'axios'
import MyCard from './components/Cards.jsx';
import AddBook from './components/SweetAlertForm.jsx';

import { toast, ToastContainer } from "react-toastify";

function App() {

  const [inpBook, setInpBook] = useState('')
  const [books, setBooks] = useState('')

  useEffect(() => {

    async function fetchData() {
      const res = await axios.get(`https://backend-production-9c79.up.railway.app/books`)
      // const res = await axios.get(`http://localhost:3000/books`)
      // console.log(res.data)

      setBooks(res.data)
    }
    fetchData();
  }, [])

  const getBook = async () => {
    // const res = await axios.get(`http://localhost:3000/books/${inpBook}`)
    const selectedBook = await axios.get(`https://backend-production-9c79.up.railway.app/books/${inpBook}`)
    console.log(selectedBook)

    setBooks(selectedBook.data)

  }

  // Function to remove book from UI after deletion
  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));

    toast.error("Item deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

  };


  // Function to add a new book to the list dynamically
  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };


  return (
    <>

      <MyLayout>
        <div className="container">

        <ToastContainer /> 
        {/* react-toastify library */}

          <div className="header d-flex flex-wrap justify-content-between align-items-center mx-lg-5">
            <div className="">
              <input type="text" placeholder='Enter Book' className='inp' onChange={(e) => setInpBook(e.target.value)} />


              <button class="search-button" onClick={getBook}>Search</button>

            </div>


            {/* <AddBook onBookAdded={setBooks} /> */}
            <AddBook onBookAdded={handleBookAdded} setBooks={setBooks} />
          </div>

          {books.length === 0 &&
            <h1>
              <div class="loader"></div>
            </h1>}

          <div className="wrapper d-flex justify-content-around flex-wrap">
            {books && books.map((book, index) => {
              return (
                <MyCard key={index} name={book.book_name} pub={book.publisher} year={book.year_published} desc={book.description} id={book.id} onDelete={handleDelete} />

              )

            })}
          </div>

        </div>
      </MyLayout>

    </>
  )
}

export default App
