export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    ecole: {
      libelle: string;
    }
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  ecole?: {
    libelle: string;
  }
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone: string;
  statut: string;
  ecole: string;
  date: string;
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