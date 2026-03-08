import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem('refreshToken');
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/token/refresh/`,
          { refresh }
        );
        
        localStorage.setItem('accessToken', response.data.access);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;