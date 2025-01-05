import axios from 'axios';
import type { Student } from '@/types/auth';

const BASE_URL = 'https://kahoot.nos-apps.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
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
  console.log('Attempting login with:', { email });
  try {
    const response = await api.post('/login', { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const getStudents = async () => {
  console.log('Fetching students...');
  try {
    const response = await api.get('/apprenant');
    console.log('Students response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Get students error:', error);
    throw error;
  }
};

export const addStudent = async (studentData: Omit<Student, '_id'>) => {
  console.log('Adding student:', studentData);
  try {
    const response = await api.post('/apprenant', studentData);
    console.log('Add student response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add student error:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId: string) => {
  console.log('Deleting student:', studentId);
  try {
    const response = await api.delete(`/apprenant/delete/${studentId}`);
    console.log('Delete student response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete student error:', error);
    throw error;
  }
};

export const getMockTeachers = () => {
  return [
    { id: '1', name: 'John Doe', subject: 'Mathematics', email: 'john@school.com' },
    { id: '2', name: 'Jane Smith', subject: 'Physics', email: 'jane@school.com' },
    { id: '3', name: 'Bob Wilson', subject: 'Chemistry', email: 'bob@school.com' },
  ];
};
