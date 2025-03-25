import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

// Login User
export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

// Get User Profile
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update User Profile
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/user/profile`, userData, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create New User (Admin Functionality)
export const createUser = async (userData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/user/create`, userData, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
