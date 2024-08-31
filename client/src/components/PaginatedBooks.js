import React, { useState } from 'react';
import { books } from '../index';

const ITEMS_PER_PAGE = 4;

function PaginatedBooks({editingBook}) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  return (
    <div className="album py-5 bg-body-tertiary">
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems
            .filter(item => item.availability === 'active')
            .map((item) => (
              <div className="card" style={{ width: '18rem', margin: '10px', display: "inline-block" }} key={item.id}>
                <div className="card shadow-sm">
                  <img src={item.image} alt={item.name} className="bd-placeholder-img card-img-top" width="100%" height="250" />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Prix: {item.price.toFixed(2)} CFA</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <button
                            class="btn btn-outline-info"
                            onClick={() => handleShowDetails(item)}
                        >
                            Details   
                            <i class="bi bi-info-circle-fill"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>Aucun produit trouvé</div>
        )}
      

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Précédent</button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant</button>
      </div>

      <div className={`modal fade ${showDetailsModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="detailsLabel" aria-hidden={!showDetailsModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailsLabel">Détails du Livre</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="details-content">
              {selectedProduct ? (
                <>
                  <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: 'auto' }} />
                  <h5 className="mt-3">{selectedProduct.name}</h5>
                  <p>{selectedProduct.description}</p>
                  <p><strong>Prix:</strong> {selectedProduct.price.toFixed(2)} CFA</p>
                </>
              ) : (
                <p>Aucun détail disponible.</p>
              )}
              <div className="d-flex justify-content-between align-items-center">
                      <button
                          className="btn btn-outline-primary my-2 my-sm-0"
                          // onClick={() => editingBook(item.id)}
                      >
                          Modifier
                      </button>

                      <button
                         type="button" class="btn btn-outline-primary"
                          // onClick={() => handleShowDetails(item)}
                      >
                          Archiver
                      </button>

                      <button
                         type="button" class="btn btn-outline-danger"
                          // onClick={() => handleShowDetails(item)}
                      >
                          Supprimer
                      </button>
                    </div>
              <button className="btn btn-success mt-3" onClick={handleCloseModal}>Fermer</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PaginatedBooks;
