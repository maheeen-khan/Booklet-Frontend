import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyLayout from './components/Layout.jsx'
import { useState, useEffect, useRef} from 'react'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import axios from 'axios'
import MyCard from './components/Cards.jsx';
import AddBook from './components/SweetAlertForm.jsx';
import { toast, ToastContainer } from "react-toastify";


function App() {

  const [inpBook, setInpBook] = useState('')
  const [books, setBooks] = useState([])
  const [refreshLoading, setRefreshLoading] = useState(false); // 🔹 Loading state for Refresh
  const[search, setSearch] = useState(false);

  const inputRef = useRef(null); // 🔹 Create a reference for input field so that it would be focused when clicks on Nav


  useEffect(() => {

    async function fetchData() {
      // const res = await axios.get(`https://backend-production-9c79.up.railway.app/books`)
      const res = await axios.get(`http://localhost:4000/books`)
      // console.log(res.data)

      setBooks(res.data)
    }
    fetchData();
  }, [])

  const getBook = async () => {

    try {
      if (inpBook === '') {
        toast.error("Please enter a book name!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      else if (inpBook !== '') {
        const res = await axios.get(`http://localhost:4000/books/${inpBook}`)
        setBooks(res.data)

        if (Array.isArray(res.data)) {
          setBooks(res.data);  // ✅ If the response is already an array, set it directly
        } else {
          setBooks([res.data]); // ✅ If the response is an object, wrap it in an array
        }

      }

    }
    catch (error) {
      console.error(error);
    }
    finally {
      setSearch(false); // 🔹 Reset loading state after fetching
    }

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

      <MyLayout inputRef={inputRef}>
        <div className="container">

          <ToastContainer />
          {/* react-toastify library */}

          <div className="header d-flex flex-wrap justify-content-between align-items-center mx-lg-5">
            <div className="">
              <input type="text" placeholder='Enter book name' className='inp'  ref={inputRef} value={inpBook} onChange={(e) => setInpBook(e.target.value)}/>


              {/* <button class="search-button" onClick={getBook}>Search</button> */}

              <Button class="search-button"
               style={{ 
                position: "relative",
                 overflow: "hidden",
                  backgroundColor:"#f48d4d", 
                  color: "white",
                  border: "none",
                  padding: "0px",
                  padding: "19px"
                 
                }}
                onClick={()=>{
                setSearch(true);
                setTimeout(() => {
                  getBook();
                  setInpBook('') //empty input field after search
                }, 600);
               
                }}
                icon={search ? <LoadingOutlined/> :  <SearchOutlined /> }>
                 {search ? "Searching..." : "Search"}
              </Button>

            </div>

            <div className="">
              {/* Refresh button */}

              <Button
                className='refresh me-2'
                loading={refreshLoading}
                onClick={() => {
                  setRefreshLoading(true); // Show loading before reload
                  setTimeout(() => {
                    window.location.reload(); // Reload after a slight delay
                  }, 700); // Delay to allow React to update UI
                }}
              >
                {refreshLoading ? "Refreshing..." : "Refresh"}
              </Button>
              <AddBook onBookAdded={handleBookAdded} setBooks={setBooks} />
            </div>

          </div>

          {books.length === 0 &&
            <h1>
              <div class="loader"></div>
            </h1>}

          <div className="wrapper d-flex justify-content-around flex-wrap">
            {Array.isArray(books) && books.map((book, index) => {
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
export default App;
