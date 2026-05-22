import apiClient from "./apiClientService";

export const getBanners = async () => {
  const response = await apiClient.get("/banner");
  return response.data;
};

export const getServices = async () => {
  const response = await apiClient.get("/services");
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await apiClient.put("/profile/upadate", data);
  return response.data;
};

export const updateImage = async (data) => {
  const response = await apiClient.put("/profile/image", data);
  return response.data;
};

export const getBalance = async () => {
  const response = await apiClient.get("/balance");
  return response.data;
};

export const topup = async (data) => {
  const response = await apiClient.post("/topup", data);
  return response.data;
};

export const transaction = async (data) => {
  const response = await apiClient.post("/transaction", data);
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await apiClient.get("/transaction/history");
  return response.data;
};
