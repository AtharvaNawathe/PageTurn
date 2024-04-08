import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  getBookById(bookId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/books/getBookById/${bookId}`, {
      headers,
    });
  }

  getBookReviews(bookId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books/${bookId}/reviews`);
  }

  getUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getSimilarBooks(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books/similar/${userId}`);
  }
  deleteReview(reviewId: string): Observable<any> {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      throw new Error('Authentication token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    const url = `${this.apiUrl}/books/review/${reviewId}`;
    return this.http.delete(url, { headers });
  }
  deleteBook(bookId: string): Observable<any> {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      throw new Error('Authentication token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `${authToken}`,
    });
    const url = `${this.apiUrl}/books/${bookId}`;
    return this.http.delete(url, { headers });
  }

  updateBook(bookId: string, bookData: any): Observable<any> {
    const url = `${this.apiUrl}/books/${bookId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });

    return this.http.put<any>(url, bookData, { headers });
  }
}
