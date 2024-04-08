import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import tags from '../constants/tags';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-edit-book-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.css'
})
export class EditBookModalComponent implements OnInit {
  editBookForm!: FormGroup;
  bookData: any;
  tags: string[] = tags;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<EditBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
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

    this.bookData = this.data.book;
    this.populateForm(this.data.book);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  submitBook(): void {
    const bookId = this.data.book._id;
    const bookData = this.editBookForm.value;
  
    this.bookService.updateBook(bookId, bookData).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        this.editBookForm.reset();
        this.dialogRef.close(true); // Pass true to indicate success
      },
      (error) => {
        console.error('Error updating book:', error);
        this.dialogRef.close(false); // Pass false to indicate failure
      }
    );
  }

  private populateForm(bookData: any): void {
    this.editBookForm.patchValue(bookData);
  }
}
