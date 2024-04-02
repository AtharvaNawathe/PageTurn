import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/api/books'; // Update the API URL accordingly

  constructor(private http: HttpClient) { }

  postReview(bookId: string, rating: string, content: string) {
    // Get token from local storage
    const token = localStorage.getItem('token');

    // Set headers with authorization token
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    // Make POST request with headers
    return this.http.post(`${this.apiUrl}/${bookId}/reviews`, { rating, content }, { headers });
  }
  addCommentToReview(reviewId: string, userId: string, comment: string, token: string): Observable<any> {
    const url = `http://localhost:3000/api/books/${reviewId}/comments`;
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post<any>(url, { comment }, { headers });
  }
  likeReview(reviewId: string, token: string): Observable<any> {
    const url = `http://localhost:3000/api/books/${reviewId}/like`;
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post<any>(url,{}, { headers });
  }
  unlikeReview(reviewId: string, token: string): Observable<any>{
    const url = `http://localhost:3000/api/books/${reviewId}/unlike`;
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post<any>(url,{}, { headers });
  }
}
