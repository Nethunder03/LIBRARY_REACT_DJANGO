import React from 'react';

const AddBook = ({book, showCartModal, isEditing, setShowCartModal, handleChange, handleSubmit}) => {
    return (
        <div className={`modal fade ${showCartModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="cartLabel" aria-hidden={!showCartModal}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h3>{isEditing ? 'Modifier un Livre' : 'Ajouter un Livre'}</h3>
                    <button type="button" className="close" onClick={() => setShowCartModal(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div className="form-holder">
                    <form className="requires-validation" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                    <div className="form-content">
                        <div className="col-md-12">
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                placeholder="Titre du livre"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <input
                                className="form-control"
                                type="text"
                                name="author"
                                placeholder="Nom de l'Auteur"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <select
                                className="form-select mt-3"
                                name="gender"
                                value={book.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Genre
                                </option>
                                <option value="roman">Roman</option>
                                <option value="narratif">Narratif</option>
                                <option value="poetique">Poetique</option>
                                <option value="theatral">Theatral</option>
                                <option value="epistolaire">Epistolaire</option>
                                <option value="fiction">Fiction</option>
                                <option value="argumentatif">Argumentatif</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <input
                                className="form-control"
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={book.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <input
                                className="form-control"
                                type="date"
                                name="pubdate"
                                placeholder="Date de Publication"
                                value={book.pubdate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <input
                                className="form-control"
                                type="file"
                                name="cover_image"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-12">
                            <select
                                className="form-select mt-3"
                                name="avalability"
                                value={book.avalability}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Disponibilité
                                </option>
                                <option value="Yes">Oui</option>
                                <option value="No">Non</option>
                            </select>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="invalidCheck"
                                required
                            />
                            <label className="form-check-label">
                                I confirm that all data are correct
                            </label>
                            <div className="invalid-feedback">
                                Please confirm that the entered data are all correct!
                            </div>
                        </div>

                        <div className="form-button mt-3">
                            <button id="submit" type="submit" className="btn btn-primary">
                                {isEditing ? 'Sauvegarder' : 'Ajouter'}
                            </button>
                        </div>
                        </div>
                    </form>
                </div>

                <div className="modal-body" id="cart-content">
                </div>
            </div>
        </div>
    </div>
    );
};

export default AddBook;
