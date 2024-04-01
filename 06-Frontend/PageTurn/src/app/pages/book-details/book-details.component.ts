import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/register.service';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [NavbarComponent, CommonModule,FormsModule],
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
    private userService: UserService,
    private reviewService: ReviewService
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

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0) // for example
  });
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
        this.fetchUsernamesForReviews();
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


  submitReview(star1: HTMLInputElement, star2: HTMLInputElement, star3: HTMLInputElement, star4: HTMLInputElement, star5: HTMLInputElement, review: string): void {
    let rating: string;
    if (star1.checked) rating = star1.value;
    else if (star2.checked) rating = star2.value;
    else if (star3.checked) rating = star3.value;
    else if (star4.checked) rating = star4.value;
    else if (star5.checked) rating = star5.value;
    else {
      console.error('No rating selected');
      return;
    }
    console.log(' rating:', rating);
    console.log('content:', review);
    this.postReview(this.bookId, rating, review)
  }

  postReview(bookId: string, rating: string, content: string) {
    this.reviewService.postReview(bookId, rating, content)
      .subscribe(
        () => {
          console.log('Review posted successfully');
          this.getReviews(); 
          // Optionally, you can handle success response here
        },
        (error) => {
          console.error('Error posting review:', error);
          // Optionally, you can handle error response here
        }
      );
  }
  fetchUsernamesForReviews(): void {
    for (let review of this.reviews) {
      this.userService.getUserById(review.user).subscribe(
        (user) => {
          review.username = user.username;
          console.log("username",user.username);
          
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }


  toggleCommentBox(review: any): void {
    review.showCommentBox = !review.showCommentBox; // Toggle visibility of comment box
    review.newComment = ''; // Clear any existing comment
  }

  postComment(review: any): void {
    // Call the API to post the comment
    console.log("Comment ",review.
    _id);
    this.reviewService.addCommentToReview(review._id, review.userId, review.newComment,this.token).subscribe(
      (response) => {
        console.log('Comment posted successfully:', response);
        review.showCommentBox = false;
      },
      (error) => {
        // Handle error
        console.error('Error posting comment:', error);
      }
    );
  }
  likeReview(review: any): void {
    review.likes = review.likes ? review.likes + 1 : 1;
    this.reviewService.likeReview(review._id,this.token).subscribe(
      (response) => {
        // Handle success
        console.log('Review liked successfully:', response);
      },
      (error) => {
        // Handle error
        console.error('Error liking review:', error);
      }
    );
  }
  
}
