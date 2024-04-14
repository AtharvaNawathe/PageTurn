import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecaptchaModule } from "ng-recaptcha";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,RecaptchaModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('textElement') textElement!: ElementRef;
  email: any;
  password: any;
  captchaResolved: boolean = false;
  ngAfterViewInit() {
    this.typingEffect();
  }
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: RecaptchaModule
  ) {}

  signIn(email: string, password: string): void {
    this.authService.signIn(email, password).subscribe(
      (response) => {
        console.log('Calling from login components', response);
        const token = response.token;
        if(token=='Incorrect password'){
          this.snackBar.open('Incorrect password', 'Close', {
            duration: 3000, 
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
        if(token=="User with this email does not exist"){
          this.snackBar.open('User with this email does not exist', 'Close', {
            duration: 3000, 
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          }
        
        if (token) {
          // Decode the JWT token
          const decodedToken: any = jwtDecode(token);
          // Check if the token is expired
          console.log("decoded ",decodedToken);
          
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.error('Token is expired.');
          } else {
            this.authService.storeToken(token);
            console.log('Sign-in successful! Token stored.');
            if(decodedToken.isAdmin){
              this.router.navigate(['/admin']);
            }else{

              this.authService.navigateToHomepage();
            }
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
    this.router.navigate(['/signup']);
  }
  forgotPass(){
    this.router.navigate(['/forgotPassword']);
  }

  signUpSuccess() {
    this.router.navigate(['/home']);
  }

  typingEffect() {
    const text = this.textElement.nativeElement.textContent.trim();
    this.textElement.nativeElement.textContent = '';
    let i = 0;
    const speed = 100; 
    const typeWriter = () => {
      if (i < text.length) {
        this.textElement.nativeElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  }
  resolved(captchaResponse: string|null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaResolved = true;
  }
  
}



