import axios from 'axios';

// Configuration de base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Instance Axios avec configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs et refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Tenter de rafraîchir le token
        const response = await axios.post(
          `${API_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);

        // Réessayer la requête originale
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Service API avec méthodes utilitaires
export const apiService = {
  // Authentication
  async register(data) {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async login(data) {
    const response = await api.post('/api/auth/login', data);
    const { access_token, refresh_token, user } = response.data;
    
    // Sauvegarder les tokens
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.clear();
    }
  },

  async getCurrentUser() {
    const response = await api.get('/api/auth/me');
    return response.data.user;
  },

  async updateProfile(data) {
    const response = await api.put('/api/auth/me', data);
    return response.data.user;
  },

  // Subjects
  async getSubjects() {
    const response = await api.get('/api/subjects');
    return response.data;
  },

  async createSubject(data) {
    const response = await api.post('/api/subjects', data);
    return response.data;
  },

  // Tasks
  async getTasks() {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  async createTask(data) {
    const response = await api.post('/api/tasks', data);
    return response.data;
  },

  // Schedule
  async uploadSchedule(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/schedules/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Planning
  async generatePlanning(data) {
    const response = await api.post('/api/planning/generate', data);
    return response.data;
  },

  async getPlannings() {
    const response = await api.get('/api/planning');
    return response.data;
  },

  // Statistics
  async getStatistics() {
    const response = await api.get('/api/statistics');
    return response.data;
  },
};

// Export aussi l'instance axios brute pour des cas spéciaux
export default api;