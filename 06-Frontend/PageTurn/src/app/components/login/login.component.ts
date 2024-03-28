import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [CommonModule,FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
email: any;
password: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(email: string, password: string): void {
    this.authService.signIn(email, password).subscribe(
      (response) => {
        console.log("Calling from login components", response);
        const token = response.token;
        if (token) {
          // Decode the JWT token
          const decodedToken: any = jwtDecode(token);
          // Check if the token is expired
          const currentTime = Date.now() / 1000;
        
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.error('Token is expired.');
          } else {
            // Token is valid, store it and navigate to homepage
            this.authService.storeToken(token);
            console.log('Sign-in successful! Token stored.');
            this.authService.navigateToHomepage();
          }
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
    // Navigate to signup page
    this.router.navigate(['/signup']);
  }

  signUpSuccess() {
    // Navigate to homepage
    this.router.navigate(['/home']);
  }
 
}
