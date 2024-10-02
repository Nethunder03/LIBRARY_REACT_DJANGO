import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { apiRequest } from '../utils/api';

const Loans = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [editedLoan, setEditedLoan] = useState(null);

  const handleCloseModal = () => {
    setShowInfoModal(false);
    setSelectedLoan(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedLoan(null);
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchLoans();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiRequest('http://127.0.0.1:8000/books/');
      setBooks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiRequest('http://127.0.0.1:8000/users/profiles/');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await apiRequest('http://127.0.0.1:8000/loans/');
      setLoans(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des emprunts:', error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : 'Inconnu';
  };

  const getBookDetails = (bookId) => {
    return books.find(b => b.id === bookId) || {};
  };

  const handleShowInfoModal = (loan) => {
    setSelectedLoan(loan);
    setShowInfoModal(true);
  };

  const handleShowEditModal = (loan) => {
    setEditedLoan(loan);
    setShowEditModal(true);
  };

  const handleEditLoan = async (updatedLoan) => {
    try {
      await apiRequest(`http://127.0.0.1:8000/loans/${updatedLoan.id}/`, 'PUT', updatedLoan);
      fetchLoans(); // Rafraîchir la liste des emprunts
      handleCloseEditModal();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'emprunt:', error);
    }
  };

  const handleDeleteLoan = async (loanId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet emprunt ?")) {
      try {
        await apiRequest(`http://127.0.0.1:8000/loans/${loanId}/`, 'DELETE');
        fetchLoans(); 
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'emprunt:', error);
      }
    }
  };

  return (
    <Wrapper>
      <div>
        <div className="limiter">
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100">
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column1">Livre</th>
                      <th className="column2">Utilisateur</th>
                      <th className="column3">Date d'emprunt</th>
                      <th className="column4">Date de retour</th>
                      <th className="column5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((item, index) => (
                      <tr key={index}>
                        <td className="column1">{getBookDetails(item.book).title || 'Inconnu'}</td>
                        <td className="column2">{getUserName(item.user)}</td>
                        <td className="column3">{new Date(item.loan_date).toLocaleString()}</td>
                        <td className="column4">{item.return_date ? new Date(item.return_date).toLocaleString() : "Non retourné"}</td>
                        <td className="column5">
                          <div className="btn-group" role="group">
                            <button 
                              type="button" 
                              className="btn btn-info"
                              onClick={() => handleShowInfoModal(item)}
                            >
                              <i className="fa-solid fa-circle-info"></i>
                              Info
                            </button>
                            <button type="button" className="btn btn-warning" onClick={() => handleShowEditModal(item)}>
                              <i className="fa-regular fa-pen-to-square"></i>
                              Modifier
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteLoan(item.id)}>
                              <i className="fa-solid fa-trash"></i>
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal d'information */}
        <div
          className={`modal fade ${showInfoModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="infoLabel"
          aria-hidden={!showInfoModal}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" style={{ backgroundColor: "grey" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="infoLabel">Information</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '85vh', overflowY: 'auto', color: "white" }}>
                {selectedLoan && (
                  <>
                    <h5>Titre: {getBookDetails(selectedLoan.book).title}</h5>
                    <h6>Auteur: {getBookDetails(selectedLoan.book).author}</h6>
                    <h6>Catégorie: {getBookDetails(selectedLoan.book).isbn}</h6>
                    <h6>Genre: {getBookDetails(selectedLoan.book).gender}</h6>
                    <h5>Emprunteur: {getUserName(selectedLoan.user)}</h5>
                    <h6>Email: {users.find(u => u.id === selectedLoan.user)?.email || 'Inconnu'}</h6>
                    <h6>Date d'emprunt: {new Date(selectedLoan.loan_date).toLocaleString()}</h6>
                    <h6>Date de retour: {selectedLoan.return_date ? new Date(selectedLoan.return_date).toLocaleString() : "Non retourné"}</h6>
                  </>
                )}
                <br />
                <button className="btn btn-secondary" onClick={handleCloseModal}>Fermer</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de modification */}
        <div
          className={`modal fade ${showEditModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editLabel"
          aria-hidden={!showEditModal}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" style={{ backgroundColor: "grey" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="editLabel">Modifier l'emprunt</h5>
                <button type="button" className="close" onClick={handleCloseEditModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ color: "white" }}>
                {editedLoan && (
                  <form onSubmit={(e) => { e.preventDefault(); handleEditLoan({ ...editedLoan, /* Ajoute ici les champs que tu souhaites modifier */ }); }}>
                    <div className="form-group">
                      <label>Titre du livre:</label>
                      <input type="text" className="form-control" value={getBookDetails(editedLoan.book).title} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Utilisateur:</label>
                      <input type="text" className="form-control" value={getUserName(editedLoan.user)} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Date d'emprunt:</label>
                      <input type="datetime-local" className="form-control" value={new Date(editedLoan.loan_date).toISOString().slice(0, 16)} onChange={(e) => setEditedLoan({ ...editedLoan, loan_date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Date de retour:</label>
                      <input type="datetime-local" className="form-control" value={editedLoan.return_date ? new Date(editedLoan.return_date).toISOString().slice(0, 16) : ""} onChange={(e) => setEditedLoan({ ...editedLoan, return_date: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sauvegarder</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Annuler</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Loans;
