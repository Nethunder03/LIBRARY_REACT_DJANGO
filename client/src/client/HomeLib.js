import React, { useState, useEffect } from 'react';
import PaginatedBooks from '../components/PaginatedBooks';

const HomeLib = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);


  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };


  const handleConfirm = async () => {
    // const { user } = useAuth();
  
    // if (!selectedProduct || !user) return; 
  
    // try {
    //   const response = await fetch(`http://127.0.0.1:8000/loans/`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       book: selectedProduct.id, // ID du livre
    //       user: user.id, // Utilisateur authentifié
    //       loansdate: new Date().toISOString().split('T')[0], // Date d'aujourd'hui
    //       backdate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], // Date de retour (14 jours plus tard)
    //     }),
    //   });
  
    //   console.log('Response:', response);
  
    //   if (response.ok) {
    //     alert('Emprunt confirmé avec succès !');
    //     // Optionnel : Mettre à jour l'état local si nécessaire
    //   } else {
    //     const errorData = await response.json();
    //     alert(`Erreur : ${errorData.message || 'Erreur inconnue.'}`);
    //   }
    // } catch (error) {
    //   console.error('Erreur lors de l\'emprunt:', error);
    //   alert('Erreur réseau. Veuillez réessayer.');
    // }
  
    handleCloseModal();
  };
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                        </li>

                    </ul>
                    <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    
                    </div>
                    
                </div>

                
                <div class="pen-wrapper">
                <div class="pen-wrapper__inner">
                    <nav class="nav">
      
      <input type="checkbox" id="menu-button"  class="menu-button__input" />
      <label for="menu-button" class="menu-button">
        <span class="menu-button__icon">
          <span class="menu-button__icon-strip"></span>
        </span>
      </label>
      
      <div class="nav__inner">
        <figure class="nav__avatar">
          <img src="http://www.foolproof.co.uk/media/466535/Luke-Burroughs.jpg" alt="" />
        </figure>
        <ul class="nav-list">
          <li class="nav-list__item">
            <a href="#" class="nav-list__url">
              Allo
            </a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__url">
              Bravo
            </a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__url">
              Cell
            </a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__url">
              Dicta
            </a>
          </li>
        </ul>
      </div>
      
    </nav>
  </div>
</div>


            </nav>
            <PaginatedBooks userType="Client" handleConfirm={handleConfirm}/>
        </div>
    );
};

export default HomeLib;