import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmationService } from 'primeng/api';
import { StudentStore } from '../../services/student.store';
import { Student } from '../../models/student.model';
import { LucideAngularModule, Plus, Pencil, Trash2 } from 'lucide-angular';

type StudentRow = Student & {
  coursesText: string;
};

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ListboxModule,
    LucideAngularModule
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  private store = inject(StudentStore);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);

  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  students = computed<StudentRow[]>(() =>
    this.store.students().map(s => ({
      ...s,
      coursesText: (s.courses ?? []).join(', ')
    }))
  );
  
  showAddDialog = signal(false);
  showEditCoursesDialog = signal(false);
  
  studentForm: FormGroup;
  coursesForm: FormGroup;
  
  selectedStudentId: string | null = null;
  selectedStudent: Student | null = null;
  selectedStudentName: string | null = null;
  
  courseOptions = [
    { label: 'Matematika', value: 'Matematika' },
    { label: 'Fizika', value: 'Fizika' },
    { label: 'Računalništvo', value: 'Računalništvo' },
    { label: 'Ekonomija', value: 'Ekonomija' },
    { label: 'Zgodovina', value: 'Zgodovina' }
  ];

  constructor() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      enrollmentYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(2100)]],
      courses: [[]]
    });

    this.coursesForm = this.fb.group({
      courses: [[], Validators.required]
    });
  }

  openAddDialog() {
    this.studentForm.reset({
      enrollmentYear: new Date().getFullYear(),
      courses: []
    });
    this.showAddDialog.set(true);
  }

  saveNewStudent() {
    if (this.studentForm.valid) {
      const newStudent: Student = {
        id: this.store.getNextId(),
        ...this.studentForm.value
      };
      this.store.add(newStudent);
      this.showAddDialog.set(false);
    }
  }

  openEditCoursesDialog(student: Student) {
    this.selectedStudentId = student.id;
    this.selectedStudent = student;
    this.selectedStudentName = `${student.firstName} ${student.lastName}`;
    this.coursesForm.patchValue({
      courses: student.courses
    });
    this.showEditCoursesDialog.set(true);
  }

  closeEditCoursesDialog() {
    this.showEditCoursesDialog.set(false);
    this.selectedStudentId = null;
    this.selectedStudent = null;
    this.selectedStudentName = null;
  }

  saveCourses() {
    if (this.coursesForm.valid && this.selectedStudentId) {
      this.store.updateCourses(this.selectedStudentId, this.coursesForm.value.courses);
      this.closeEditCoursesDialog();
    }
  }

  confirmDelete(student: Student) {
    this.confirmationService.confirm({
      message: `Ali ste prepričani, da želite izbrisati študenta ${student.firstName} ${student.lastName}?`,
      header: 'Potrditev brisanja',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Da',
      rejectLabel: 'Ne',
      accept: () => {
        this.store.remove(student.id);
      }
    });
  }
}

