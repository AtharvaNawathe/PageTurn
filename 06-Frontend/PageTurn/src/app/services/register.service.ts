import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addToCurrentlyReading(bookId: string, token: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/currently-reading', { bookId }, { headers: { Authorization: token } });
  }

  addToWantToRead(bookId: string, token: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/want-to-read', { bookId }, { headers: { Authorization: token } });
  }

  addToRead(bookId: string, token: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/read', { bookId }, { headers: { Authorization: token } });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/users/register', userData);
  }
}
