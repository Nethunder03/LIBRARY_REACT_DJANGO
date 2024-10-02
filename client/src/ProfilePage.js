import React, { useEffect, useState } from 'react';
import { apiRequest } from './utils/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest('http://127.0.0.1:8000/users/profiles/');
        setUser(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.detail || 'Une erreur est survenue');
        } else {
          setError('Erreur réseau');
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest('http://127.0.0.1:8000/users/logout/', { method: 'POST' });
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login'; // Redirection vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setError('Erreur lors de la déconnexion');
    }
  };

  return (
    <div>
      <h1>Profil</h1>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Nom: {user.first_name} {user.last_name}</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProfilePage;