import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogOut, Search, Users, GraduationCap } from "lucide-react";
import { getMockTeachers, getMockStudents } from '@/services/api';
import type { Teacher, Student } from '@/types/auth';

const Dashboard = () => {
  const { logout } = useAuth();
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  const teachers = getMockTeachers();
  const students = getMockStudents();

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">École Manager</h1>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Statistiques */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Enseignants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Apprenants
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Table des enseignants */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des enseignants</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un enseignant..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher: Teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Table des apprenants */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des apprenants</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un apprenant..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: Student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;