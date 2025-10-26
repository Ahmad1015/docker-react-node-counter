import axios from 'axios';

// Adjust this depending on Docker setup (backend will run at http://backend:5000)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://backend:5000/api';


export const getCounter = async () => {
  const res = await axios.get(`${API_BASE_URL}/counter`);
  return res.data;
};

export const updateCounter = async (value) => {
  const res = await axios.post(`${API_BASE_URL}/counter`, { value });
  return res.data;
};
