// api.js
import axios from 'axios';

// Fonction pour rafraîchir le token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post('http://127.0.0.1:8000/users/login/refresh/', {
      refresh: refreshToken
    });

    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);

    return response.data.access;
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    throw error;
  }
};

export const apiRequest = async (url, options = {}) => {
  let token = localStorage.getItem('token');

  try {
    const response = await axios(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers
      }
    });

    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      token = await refreshToken();
      return axios(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          ...options.headers
        }
      });
    } else {
      throw error;
    }
  }
};
