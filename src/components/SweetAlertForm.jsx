import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddBook = ({ onBookAdded, setBooks }) => {
    const handleAddBook = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Add New Book",
            html: `
        <input id="book_name" class="swal2-input" placeholder="Book Name">
        <input id="publisher" class="swal2-input" placeholder="Publisher">
        <input id="year_published" type="number" class="swal2-input" placeholder="Year Published">
        <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
      `,
            showCancelButton: true,
            confirmButtonText: "Add Book",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            preConfirm: () => {
                return {
                    book_name: document.getElementById("book_name").value,
                    publisher: document.getElementById("publisher").value,
                    year_published: document.getElementById("year_published").value,
                    description: document.getElementById("description").value,
                };
            },
        });

        if (formValues) {
            try {
                // Send data to the backend
                const response = await axios.post("https://backend-production-9c79.up.railway.app/addbook", formValues);


                // Call parent function to update book list
                if (onBookAdded) {
                    onBookAdded(response.data);
                    console.log(response.data);

                    // ✅ Update the books state in the parent component
                    setBooks((prevBooks) => [...prevBooks, response.data]);
                    Swal.fire("Success!", "Book added successfully.", "success");
                }
            } catch (error) {
                Swal.fire("Error!", "Failed to add book.", "error");
                console.error("Error adding book:", error);
            }
        }
    };

    return <button class="add-button" onClick={handleAddBook}>


    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
    </svg>


    <div class="add-text">
      Add book
    </div>

  </button>;
};

export default AddBook;
