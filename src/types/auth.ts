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

export interface School {
  _id: string;
  libelle: string;
  ville: string;
  telephone: string;
}

export interface Student {
  _id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule: string;
  phone: string;
  email: string;
  ecole: School;
  date: string;
}