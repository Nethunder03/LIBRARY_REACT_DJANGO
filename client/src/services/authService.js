// src/services/Services.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/', // Remplacez par l'URL de votre API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Authentification - si vous avez besoin de gérer les tokens
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Fonction pour ajouter un utilisateur
export const addUser = async (userData) => {
    try {
        const response = await apiClient.post('/users/create/', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Utilisation de la réponse
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour obtenir la liste des utilisateurs
export const getUsers = async () => {
    try {
        const response = await apiClient.get('/users/');
        return response.data; // Utilisation de la réponse
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour obtenir les détails d'un utilisateur
export const getUserDetails = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}/`);
        return response.data; // Utilisation de la réponse
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour mettre à jour les détails d'un utilisateur
export const updateUser = async (userId, userData) => {
    try {
        const response = await apiClient.put(`/users/${userId}/`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Utilisation de la réponse
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (userId) => {
    try {
        await apiClient.delete(`/users/${userId}/`);
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour se connecter
export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/login/', credentials);
        return response.data; // Utilisation de la réponse
    } catch (error) {
        throw error.response.data;
    }
};

// Fonction pour se déconnecter
export const logoutUser = async (refreshToken) => {
    try {
        await apiClient.post('/logout/', { refresh: refreshToken });
    } catch (error) {
        throw error.response.data;
    }
};

export default apiClient;
