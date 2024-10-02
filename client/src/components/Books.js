import React, { useEffect, useState } from 'react';
import PaginatedBooks from './PaginatedBooks';
import AddBook from './AddBook';
import { apiRequest } from '../utils/api';

const Books = () => {
    const [file, setFile] = useState(null);
    const [books, setBooks] = useState([]); 
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        gender: '',
        isbn: '',
        summary: '',
        pubdate: '',
        availability: '',
    });
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        if (editingBook) {
            setBookDetails(editingBook);
        } else {
            setBookDetails({
                title: '',
                author: '',
                gender: '',
                isbn: '',
                summary: '',
                pubdate: '',
                availability: '',
            });
        }
    }, [editingBook]);

    const fetchBooks = async () => {
        try {
            const response = await apiRequest('http://127.0.0.1:8000/books/');
            const data = response.data;
            setBooks(data);
            console.log("Livres récupérés:", data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBookEdit = (book) => {
        console.log("Livre à modifier:", book);
        setEditingBook(book);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFile(files[0]);
        } else {
            setBookDetails((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
        }
    };

    const handleBookAddOrUpdate = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', bookDetails.title);
        formData.append('author', bookDetails.author);
        formData.append('gender', bookDetails.gender);
        formData.append('isbn', bookDetails.isbn);
        formData.append('summary', bookDetails.summary);
        formData.append('pubdate', bookDetails.pubdate);
        formData.append('availability', bookDetails.availability);
        if (file) {
            formData.append('cover_image', file);
        }
    
        try {
            const url = editingBook ? `http://127.0.0.1:8000/books/${editingBook.id}/` : 'http://127.0.0.1:8000/books/create/';
            const method = editingBook ? 'PUT' : 'POST';
    
            const response = await apiRequest(url, {
                method: method,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Réponse après ajout/mise à jour:", response);
    
            if (response.status === 200 || response.status === 201) {
                fetchBooks();
                setEditingBook(null);
            } else {
                const errorData = await response.text();
                console.error('Network response was not ok:', errorData);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
    };
    

    const handleDelete = async (bookId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?");
        if (confirmDelete) {
            try {
                const response = await apiRequest(`http://127.0.0.1:8000/books/${bookId}/`, {
                    method: 'DELETE',
                });

                if (response.status === 204) {
                    setBooks(books.filter(book => book.id !== bookId));
                    alert("Livre supprimé avec succès.");
                } else {
                    console.error("Erreur lors de la suppression du livre.");
                }
            } catch (error) {
                console.error("Erreur réseau:", error);
                alert("Erreur réseau lors de la suppression du livre.");
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-start">
                <div className="col-4">
                    <AddBook
                        book={bookDetails}
                        isEditing={editingBook !== null}
                        handleSubmit={handleBookAddOrUpdate}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-6">
                    <PaginatedBooks userType="Admin" editingBook={handleBookEdit} handleDelete={handleDelete} books={books} />
                </div>
            </div>
        </div>
    );
};

export default Books;
