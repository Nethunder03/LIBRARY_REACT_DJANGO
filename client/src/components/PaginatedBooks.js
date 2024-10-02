import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const ITEMS_PER_PAGE = 4;

function PaginatedBooks({ userType, editingBook, handleDelete }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/books/');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const handleConfirm = async (bookId) => {

    try {
      const token = localStorage.getItem('token');
      
      const userResponse = await apiRequest('http://127.0.0.1:8000/profiles/now/', {
        method: 'GET'
      });
  
      const user = userResponse.data;
  
      const empruntData = {
        book: bookId,
        user: user.id,
      };
  
      const response = await apiRequest('http://127.0.0.1:8000/loans/create/', {
        method: 'POST',
        data: empruntData
      });
  
      console.log('Emprunt créé avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de la création de l\'emprunt:', error);
    } finally {
    }
  };

  
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleShowDetails = (item) => {
    setSelectedProduct(item);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  const handleBookDelete = (bookId) => {
    handleDelete(bookId);
    handleCloseModal();
  };

  return (
    <div className="album py-5 bg-body-tertiary">
      {currentItems
        .filter(book => book.availability === 'Yes')
        .map((book) => (
          <div className="card" style={{ width: '18rem', margin: '10px', display: "inline-block" }} key={book.id}>
            <div className="card shadow-sm">
              <img src={`http://127.0.0.1:8000${book.cover_image}`} alt={book.title} className="bd-placeholder-img card-img-top" width="100%" height="250" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h5 className="card-title">{book.author}</h5>
                <p className="card-text">{book.pubdate}</p>
                <p className="card-text">{book.gender}</p>
                <div className="d-flex justify-content-between align-items-center">
                  {userType === 'Admin' ? (
                    <button
                      className="btn btn-outline-info"
                      onClick={() => handleShowDetails(book)}
                    >
                      Détails
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleShowDetails(book)}
                    >
                      Emprunter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      }

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Précédent</button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant</button>
      </div>

      <div className={`modal fade ${showDetailsModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="detailsLabel" aria-hidden={!showDetailsModal}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailsLabel">Détails du Livre</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="details-content">
              {selectedProduct ? (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <img src={`http://127.0.0.1:8000${selectedProduct.cover_image}`} alt={selectedProduct.title} />
                    </div>
                    <div className="col">
                      <div className="info">
                        <h5 className="mt-3"> Auteur : {selectedProduct.author}</h5>
                        <p>Date de sortie : {selectedProduct.pubdate}</p>
                        <p>Isbn : {selectedProduct.isbn}</p>
                        <p>Genre : {selectedProduct.gender}</p>
                        <p> Disponibilité : {selectedProduct.availability}</p>
                      </div>
                      <div className='summary'>
                        <h5>Résumé : </h5><br />
                        {selectedProduct.summary}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Aucun détail disponible.</p>
              )}
              {userType === 'Admin' ? (
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => editingBook(selectedProduct)}  // Passer l'objet entier pour modifier
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBookDelete(selectedProduct.id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleCloseModal}
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => handleConfirm(selectedProduct.id)}
                  >
                    Confirmer
                  </button>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={handleCloseModal}
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginatedBooks;
