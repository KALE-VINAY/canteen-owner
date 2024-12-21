import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

const apiClient = axios.create({
  baseURL: 'https://shop-status-zenu.onrender.com', // Replace with your backend API URL
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(); // Get the Firebase token
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
