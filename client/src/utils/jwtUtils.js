// src/utils/jwtUtils.js
import { jwtDecode } from 'jwt-decode';

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const decodeToken = (token) => {
  return jwtDecode(token); // Utilisez `jwtDecode` ici
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  return decoded.exp * 1000 < Date.now();
};
