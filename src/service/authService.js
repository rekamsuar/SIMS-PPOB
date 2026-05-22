import apiClient from './apiClient';

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await apiClient.post('/registration', data);
  return response.data;
};
