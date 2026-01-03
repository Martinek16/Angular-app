import { Injectable, signal, computed } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})

export class StudentStore {
  private studentsSignal = signal<Student[]>([]);
  readonly students = computed(() => this.studentsSignal());

  constructor() {
    this.seedData();
  }

  add(student: Student): void {
    this.studentsSignal.update(prev => [...prev, student]);
  }

  getNextId(): string {
    const allStudents = this.studentsSignal();
    if (allStudents.length === 0) {
      return '100';
    }
    const maxId = Math.max(...allStudents.map(s => {
      const numId = parseInt(s.id, 10);
      return isNaN(numId) ? 0 : numId;
    }));
    const next = Math.max(100, maxId + 1);
    return next.toString();
  }

  updateCourses(id: string, courses: string[]): void {
    this.studentsSignal.update(prev => 
      prev.map(s => s.id === id ? { ...s, courses: [...courses] } : s)
    );
  }

  remove(id: string): void {
    this.studentsSignal.update(prev => prev.filter(s => s.id !== id));
  }

  private seedData(): void {
    const firstNames = ['Marko', 'Ana', 'Luka', 'Tina', 'Jan', 'Maja', 'Peter', 'Eva', 'Nejc', 'Sara'];
    const lastNames = ['Novak', 'Horvat', 'Krajnc', 'Zupančič', 'Potočnik', 'Kovačič', 'Mlakar', 'Kos', 'Vidmar', 'Golob'];
    const coursesPool = ['Matematika', 'Fizika', 'Računalništvo', 'Ekonomija', 'Zgodovina'];

    const initialStudents: Student[] = Array.from({ length: 45 }, (_, i) => ({
      id: (i + 100).toString(),
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[i % lastNames.length],
      email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}${i + 1}@example.com`,
      enrollmentYear: 2020 + (i % 5),
      courses: [coursesPool[i % coursesPool.length], coursesPool[(i + 1) % coursesPool.length]]
    }));

    this.studentsSignal.set(initialStudents);
  }
}

