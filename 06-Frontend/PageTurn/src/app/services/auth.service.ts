import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  storeToken(token: string): void {
    sessionStorage.setItem('key', 'value');
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  navigateToHomepage(): void {
    this.router.navigate(['/home']);
  }

  getUserDetails(token: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/me', {
      headers: { Authorization: `${token}` },
    });
  }
}
