import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { log } from 'console';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(email: string, password: string): void {
    this.authService.signIn(email, password).subscribe(
      (response) => {
        const token = response.token;
        if (token) {
          this.authService.storeToken(token);
          console.log('Sign-in successful! Token stored.');
        } else {
          console.error('Token not found in response.');
        }
      },
      (error) => {
        console.error('Sign-in failed:', error);
      }
    );
  }
  signUp() {
    this.router.navigate(['/signup']);
  }
}
