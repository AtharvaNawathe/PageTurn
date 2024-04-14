import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

import {
  CanvasJS,
  CanvasJSAngularChartsModule,
} from '@canvasjs/angular-charts';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import tags from '../../constants/tags';
import { BookService } from '../../services/book.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AddBookModalComponent } from '../../add-book-modal/add-book-modal.component';
import { EditBookModalComponent } from '../../edit-book-modal/edit-book-modal.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  imports: [
    CanvasJSAngularChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    EditBookModalComponent
  ],
})
export class AdminDashboardComponent {
  allUsers: any[] = [];
  tags: string[] = tags;
  books: any[] = [];
  showAddBookForm: boolean = false;
  addBookForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private bookService: BookService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.initAddBookForm();
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.generateBarChart();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  initAddBookForm(): void {
    this.addBookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      genre: [this.tags[0], Validators.required],
      description: [''],
      publishedDate: [''],
      coverImage: [''],
      language: [''],
      publisher: [''],
      edition: [''],
    });
  }
  toggleAddBookForm(): void {
    this.showAddBookForm = !this.showAddBookForm;
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
  getAllUsers(): void {
    const url = 'http://localhost:3000/api/users/all/users';
    const token = this.authService.getToken();

    // Check if token exists
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `${token}`,
      });

      this.http.get<any[]>(url, { headers }).subscribe(
        (response) => {
          this.allUsers = response;
          console.log(this.allUsers);
          this.generatePieChart();
        },
        (error) => {
          console.error('Error fetching all users:', error);
        }
      );
    } else {
      console.error('JWT token not found.');
    }
  }
  generatePieChart(): void {
    let maleCount = this.allUsers.filter(
      (user) => user.gender === 'male'
    ).length;
    let femaleCount = this.allUsers.filter(
      (user) => user.gender === 'female'
    ).length;

    let totalCount = maleCount + femaleCount;

    let malePercentage = ((maleCount / totalCount) * 100).toFixed(2);
    let femalePercentage = ((femaleCount / totalCount) * 100).toFixed(2);

    let chartOptions = {
      animationEnabled: true,
      theme: 'light1',
      backgroundColor: "#EEE9CE",
      title: {
        text: 'Gender Distribution',
      },
      data: [
        {
          type: 'pie',
          startAngle: 45,
          indexLabel: '{name}: {y}%',
          indexLabelPlacement: 'inside',
          dataPoints: [
            { y: parseFloat(malePercentage), name: 'Male' },
            { y: parseFloat(femalePercentage), name: 'Female' },
          ],
        },
      ],
    };

    let chart = new CanvasJS.Chart('pieChartContainer', chartOptions);
    chart.render();
  }
  generateBarChart(): void {
    const genres = this.books.map((book) => book.genre);
    const genreCounts: { [key: string]: number } = {};

    genres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });

    const labels = Object.keys(genreCounts);
    const data = Object.values(genreCounts);
    const chartOptions = {
      animationEnabled: true,
      theme: 'light',
      backgroundColor: "#EEE9CE",
      title: {
        text: 'Genre Distribution',
      },
      data: [
        {
          type: 'column',
          dataPoints: labels.map((label, index) => ({ label, y: data[index] })),
        },
      ],
    };

    const chart = new CanvasJS.Chart('barChartContainer', chartOptions);
    chart.render();
  }
  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        console.log('Book deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting book:', error);

      }
    );
  }
  openAddBookModal(): void {
    const dialogRef = this.dialog.open(AddBookModalComponent, {
      width: '500px', 
      data: {}, 
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.ngOnInit();
    });
  }
  openEditBookModal(book: any): void {
    const dialogRef = this.dialog.open(EditBookModalComponent, {
      width: '600px',
      data: { book: book }
    });
  }
}
