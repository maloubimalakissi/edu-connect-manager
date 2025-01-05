import axios from 'axios';
import type { Student, Teacher } from '@/types/auth';

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
    console.error('Login error:', error);
    throw error;
  }
};

export const getTeachers = async () => {
  console.log('Fetching teachers...');
  try {
    const response = await api.get('/users');
    console.log('Teachers response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Get teachers error:', error);
    throw error;
  }
};

export const addTeacher = async (teacherData: Omit<Teacher, '_id' | 'date'>) => {
  console.log('Adding teacher:', teacherData);
  try {
    const response = await api.post('/users', teacherData);
    console.log('Add teacher response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add teacher error:', error);
    throw error;
  }
};

export const deleteTeacher = async (teacherId: string) => {
  console.log('Deleting teacher:', teacherId);
  try {
    const response = await api.delete(`/users/delete/${teacherId}`);
    console.log('Delete teacher response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete teacher error:', error);
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

export const addStudent = async (studentData: Omit<Student, '_id' | 'date'>) => {
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