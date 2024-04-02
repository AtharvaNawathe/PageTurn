import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  addToCurrentlyReading(bookId: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/currently-reading`,
      { bookId },
      { headers: { Authorization: token } }
    );
  }

  addToWantToRead(bookId: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/want-to-read`,
      { bookId },
      { headers: { Authorization: token } }
    );
  }

  addToRead(bookId: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/read`,
      { bookId },
      { headers: { Authorization: token } }
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, userData);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserById/${userId}`);
  }
  
  updateUserProfile(token: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/me`, updatedData, {
      headers: { Authorization: token },
    });
  }
}
