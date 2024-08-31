import React, { useState } from "react";
import Wrapper from "./Wrapper";

const Loans = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const handleCloseModal = () => {
    setShowInfoModal(false);
  };
  return (
    <Wrapper>
      <div>
        <div class="limiter">
          <div class="container-table100">
            <div class="wrap-table100">
              <div class="table100">
                <table>
                  <thead>
                    <tr class="table100-head">
                      <th class="column1">Livre</th>
                      <th class="column2">Utilisateur</th>
                      <th class="column3">Date d'emprunt</th>
                      <th class="column4">Date de retour</th>
                      <th class="column5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="column1">L'etranger</td>
                      <td class="column2">Guy Rock Ferrand</td>
                      <td class="column3">2017-09-29 01:22</td>
                      <td class="column4">2018-09-29 01:22</td>
                      <td class="column5">
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button 
                            type="button" 
                            class="btn btn-info"
                            onClick={() => setShowInfoModal(true)}
                          >
                            <i class="fa-solid fa-circle-info"></i>
                            Info
                          </button>
                          <button type="button" class="btn btn-warning">
                            <i class="fa-regular fa-pen-to-square"></i>
                            Modifier
                          </button>
                          <button type="button" class="btn btn-danger">
                            <i class="fa-solid fa-trash"></i>
                            Suppr
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
            className={`modal fade ${showInfoModal ? "show d-block" : ""}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="infoLabel"
            aria-hidden={!showInfoModal}
            >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="infoLabel">
                    Information
                    </h5>
                    <button
                    type="button"
                    className="close"
                    onClick={() => setShowInfoModal(false)}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ maxHeight: '85Svh', overflowY: 'auto' }}>
                <div class="container text-center">

                        <div className="col-9" style={{ backgroundColor: "aqua" }}>
                            <p>L'avertissement que vous recevez suggère que vous avez un champ de formulaire contrôlé qui devient non contrôlé, probablement parce que sa valeur change de définie à indéfinie. Voici comment vous pouvez résoudre ce problème :
                                Résolution des Problèmes d'Entrée Contrôlée

                                    Assurez-vous que les Valeurs de l'État sont Toujours Définies

                                Chaque champ d'entrée contrôlée doit avoir une valeur initiale définie. Vous devez vous assurer que les valeurs de vos champs d'entrée ne passent pas de définies à indéfinies.
                                Ajustez Votre Code

                                Composant BookManager

                                    Évitez de Réinitialiser l'État book à des Valeurs undefined

                                    Dans votre BookManager, assurez-vous que les valeurs par défaut sont définies dans useState et que les valeurs de chaque champ sont définies avant de les utiliser dans le formulaire.</p>
                        </div>
                        <div class="col-12" style={{ backgroundColor: "grey" }}>.col-6<br/>L'avertissement que vous recevez suggère que vous avez un champ de formulaire contrôlé qui devient non contrôlé, probablement parce que sa valeur change de définie à indéfinie. Voici comment vous pouvez résoudre ce problème :
Résolution des Problèmes d'Entrée Contrôlée

    Assurez-vous que les Valeurs de l'État sont Toujours Définies

Chaque champ d'entrée contrôlée doit avoir une valeur initiale définie. Vous devez vous assurer que les valeurs de vos champs d'entrée ne passent pas de définies à indéfinies.
Ajustez Votre Code

Composant BookManager

    Évitez de Réinitialiser l'État book à des Valeurs undefined

    Dans votre BookManager, assurez-vous que les valeurs par défaut sont définies dans useState et que les valeurs de chaque champ sont définies avant de les utiliser dans le formulaire.</div>
                    
                    </div>
                    <br />
                    <button className="btn btn-secondary" onClick={handleCloseModal}>Fermer</button>
                </div>
                </div>
            </div>


            
        </div>

      </div>
    </Wrapper>
  );
};

export default Loans;
