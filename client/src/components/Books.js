import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaginatedBooks from './PaginatedBooks';
import AddBook from './AddBook';  // Import du composant AddBook

const Books = ({editingBook}) => {
    const [showCartModal, setShowCartModal] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        gender: '',
        isbn: '',
        pubdate: '',
        avalability: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingBook) {
            setBook(editingBook);
            setIsEditing(true);
        }
    }, [editingBook]);

    useEffect(() => {
        if (id) {
            const fetchBooks = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`http://127.0.0.1:8000/books/books/${id}`);
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const data = await response.json();
                        setBook({
                            title: data.title || '',
                            author: data.author || '',
                            gender: data.gender || '',
                            isbn: data.isbn || '',
                            pubdate: data.pubdate || '',
                            cover_image: data.cover_image || '',
                            avalability: data.avalability || ''
                        });
                    } else {
                        console.error('Unexpected content type:', contentType);
                        setError('Unexpected content type');
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération du produit:', error);
                    setError('Erreur lors de la récupération du produit');
                } finally {
                    setLoading(false);
                }
            };

            fetchBooks();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('gender', book.gender);
        formData.append('isbn', book.isbn);
        formData.append('pubdate', book.pubdate);
        formData.append('avalability', book.avalability);
        if (file) {
            formData.append('cover_image', file); // Ajout du fichier image
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/books/books/create/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Network response was not ok:', errorData);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFile(files[0]); // Gérer le fichier sélectionné
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
        }
    };

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };


    return (
        <div>
            <button
                className="btn btn-outline-primary my-2 my-sm-0"
                onClick={() => setShowCartModal(true)}
            >
                Ajouter un Livre
            </button>
                    
            {/* Utilisation du composant AddBook */}
            <AddBook
                book={book}
                showCartModal={showCartModal}
                isEditing={isEditing}
                setShowCartModal={setShowCartModal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <PaginatedBooks />
        </div>
    );
};

export default Books;
