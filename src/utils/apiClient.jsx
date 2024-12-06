import axios from 'axios';
import { auth } from './firebaseConfig'; // Path to your Firebase config file

const apiClient = axios.create({
  baseURL: 'https://shop-status-zenu.onrender.com', // Replace with your backend URL
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser; // Get the currently authenticated user

    if (user) {
      const token = await user.getIdToken(); // Get the Firebase auth token
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
