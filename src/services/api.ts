import axios from 'axios';

const BASE_URL = 'http://kahoot.nos-apps.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getMockTeachers = () => {
  return [
    { id: '1', name: 'John Doe', subject: 'Mathematics', email: 'john@school.com' },
    { id: '2', name: 'Jane Smith', subject: 'Physics', email: 'jane@school.com' },
    { id: '3', name: 'Bob Wilson', subject: 'Chemistry', email: 'bob@school.com' },
  ];
};

export const getMockStudents = () => {
  return [
    { id: '1', name: 'Alice Johnson', grade: '10th', email: 'alice@school.com' },
    { id: '2', name: 'Charlie Brown', grade: '11th', email: 'charlie@school.com' },
    { id: '3', name: 'Diana Evans', grade: '12th', email: 'diana@school.com' },
  ];
};

export default api;