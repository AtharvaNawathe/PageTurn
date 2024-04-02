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
}
