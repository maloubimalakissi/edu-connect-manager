export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
}