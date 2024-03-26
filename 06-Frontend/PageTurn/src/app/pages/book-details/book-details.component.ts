import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/register.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [NavbarComponent, CommonModule],
})
export class BookDetailsComponent {
  bookId!: string;
  bookDetails: any;
  token!: string;
  newReview: any = { rating: 1, content: '' };
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.token = this.authService.getToken()!;
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.getBookDetails();
      this.getReviews(); 
    }
  }

  getBookDetails(): void {
    this.bookService.getBookById(this.bookId, this.token).subscribe(
      (response) => {
        this.bookDetails = response;
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  getReviews(): void {
    this.bookService.getBookReviews(this.bookId).subscribe(
      (response) => {
        this.reviews = response;
        // Handle reviews response
        console.log('Reviews:', this.reviews);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        // Handle error
      }
    );
  }

  generateRatingArray(rating: number): number[] {
    const result = [];
    const whole = Math.floor(rating);
    const remainder = rating - whole;
    for (let i = 0; i < whole; i++) {
      result.push(1);
    }
    if (remainder >= 0.5) {
      result.push(0.5);
    }
    return result;
  }

  addToCurrentlyReading(): void {
    this.userService.addToCurrentlyReading(this.bookId, this.token).subscribe(
      () => {
        // Handle success
        console.log('Added to Currently Reading');
      },
      (error) => {
        console.error('Error adding to Currently Reading:', error);
      }
    );
  }

  addToWantToRead(): void {
    this.userService.addToWantToRead(this.bookId, this.token).subscribe(
      () => {
        // Handle success
        console.log('Added to Want to Read');
      },
      (error) => {
        console.error('Error adding to Want to Read:', error);
      }
    );
  }

  addToRead(): void {
    this.userService.addToRead(this.bookId, this.token).subscribe(
      () => {
        // Handle success
        console.log('Added to Read');
      },
      (error) => {
        console.error('Error adding to Read:', error);
      }
    );
  }

  
}
