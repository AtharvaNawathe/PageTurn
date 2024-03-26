import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  getBookById(bookId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/getBookById/${bookId}`, { headers });
  }
}
