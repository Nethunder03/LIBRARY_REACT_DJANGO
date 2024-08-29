# LIBRARY_REACT_DJANGO

Projet : Développement d'une API REST Django pour une application de gestion de bibliothèque
Contexte :
Les étudiants devront développer une API REST Django pour une application web de gestion de bibliothèque simple. Cette application permettra aux utilisateurs de :
    • Ajouter, modifier et supprimer des livres.
    • Rechercher des livres par titre, auteur ou genre.
    • Emprunter et rendre des livres.
    • Consulter leur historique d'emprunts.
Fonctionnalités de l'API :
Modèles de données :
          Livre (titre, auteur, genre, ISBN, date de publication, disponibilité)
          Utilisateur (nom, prénom, email, mot de passe)
          Emprunt (livre, utilisateur, date d'emprunt, date de retour prévue
        ◦ Points d'accès (endpoints) :
          /books/ : Liste tous les livres, possibilité de filtrer et trier.
          /books/<id>/ : Détails d'un livre spécifique.
          /users/ : Gestion des utilisateurs (création, modification, suppression, liste, détail).
          /loans/ : Gestion des emprunts (création, modification, suppression, liste, détail).
    • Authentification :
          Utiliser un système d'authentification basé sur des tokens (JWT) pour sécuriser les accès à l'API.
    • Validation des données :
          Mettre en place des validations côté serveur pour s'assurer de la cohérence des données envoyées par le frontend.
    • Optimisation :
          Utiliser des techniques de pagination pour gérer de grands ensembles de données.
          Mettre en cache les données fréquemment utilisées.
    • Documentation :
          Générer une documentation interactive de l'API à l'aide de Swagger ou d'un outil similaire.
Environnement de développement :
    • Backend : Django, Django REST Framework, Python 3.x
    • Frontend : React
    • Base de données : PostgreSQL, MySQL ou une autre base de données relationnelle.

NB : Si vous le souhaitez (optionnel) vous pouvez utiliser SQLite3 et précharger des livres dans la table correspondante.
Évaluation :
L'évaluation portera sur :
    • La qualité du code : Respect des bonnes pratiques, modularité, testabilité.
    • La conception de l'API : Respect des principes REST, organisation des endpoints.
    • La sécurité : Mise en place d'une authentification solide
    • Les performances : Optimisation des requêtes, utilisation de mécanismes de cache.
    • La documentation : Clarté et exhaustivité de la documentation de l'API.
