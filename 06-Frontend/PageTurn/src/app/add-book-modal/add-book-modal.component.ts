import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import tags from '../Constants/tags';
import { AuthService } from '../services/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.css'
})
export class AddBookModalComponent {
  addBookForm!: FormGroup;
  tags: string[] = tags;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddBookModalComponent>
  ) {}

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      genre: ['', Validators.required],
      description: [''],
      publishedDate: [''],
      coverImage: [''],
      language: [''],
      publisher: [''],
      edition: ['']
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  submitBook(): void {
    const url = 'http://localhost:3000/api/books';
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `${token}`,
      });

      this.http.post<any>(url, this.addBookForm.value, { headers }).subscribe(
        (response) => {
          console.log('Book added successfully:', response);
          this.addBookForm.reset();
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    } else {
      console.error('JWT token not found.');
    }
  }
}
