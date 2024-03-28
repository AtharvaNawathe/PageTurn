import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [NavbarComponent,CommonModule,RouterModule ],
})
export class HomepageComponent {
  quote: string = '';
  author: string = '';
  books: any[] = [];
  filteredBooks: any[] = [];
  allBooks :any[] =[];

  constructor(private http: HttpClient, private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.fetchUserInterests(); // Fetch user interests after fetching books
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  fetchQuote() {
    this.http.get<any>('https://api.quotable.io/random').subscribe(
      (response) => {
        this.quote = response.content;
        this.author = response.author;
      },
      (error) => {
        console.error('Error fetching quote:', error);
      }
    );
  }
  fetchUserInterests() {
    // Retrieve authentication token from local storage
    const authToken = localStorage.getItem('token');
    if (authToken) {
      // Fetch user data from backend API using the authentication token
      this.http.get<any>('http://localhost:3000/api/users/me', { headers: { 'Authorization': `${authToken}` } })
        .subscribe(
          (userData) => {
            console.log('User data:', userData); // Log user data
            // Extract user interests from the user data
            const userInterests = userData.interests;
            console.log('User interests:', userInterests); // Log user interests
            // Fetch all books
            this.bookService.getBooks().subscribe(
              (booksData) => {
                console.log('All books:', booksData); // Log all books
                this.allBooks=booksData;
                // Filter books based on user's interests
                const filteredBooks = this.filterBooks(booksData, userInterests);
                console.log('Filtered books:', filteredBooks); // Log filtered books
                this.books=filteredBooks
              },
              (error) => {
                console.error('Error fetching all books:', error); // Log error fetching all books
              }
            );
          },
          (error) => {
            console.error('Error fetching user data:', error); // Log error fetching user data
          }
        );
    } else {
      console.error('Authentication token not found'); // Log error for missing authentication token
    }
  }

  // Function to filter books based on user's interests
  filterBooks(booksData: any[], userInterests: string[]): any[] {
    // Implement book filtering logic here
    // For now, let's assume we have a simple filter based on genre
    return booksData.filter(book => userInterests.includes(book.genre));
}

    generateRatingArray(averageRating: number): number[] {
      const ratingArray = [];
      for (let i = 0; i < averageRating; i++) {
          ratingArray.push(1);
      }
      const totalStars = ratingArray.length;
      for (let i = totalStars; i < averageRating; i++) {
          ratingArray.push(0);
      }
      return ratingArray;
  }



 
}
