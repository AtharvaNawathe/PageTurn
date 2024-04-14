import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/register.service';
import countries from '../../constants/countries';
import { Router } from '@angular/router';
import tags from '../../constants/tags';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  standalone: true,
})
export class SignUpComponent {
  countries: string[] = countries;
  signUpForm: FormGroup;
  interests: string[] = tags;
  currentStep: number = 0;
  steps: number[] = [0, 1, 2, 3];
  today: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required],
      country: ['India', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      interests: ['fiction',Validators.required],
    });
  }

  nextPrev(step: number) {
    this.currentStep += step;
    if (this.currentStep < 0) {
      this.currentStep = 0;
    } else if (this.currentStep >= this.steps.length) {
      this.currentStep = this.steps.length - 1;
    }
  }

  onSubmit() {
    this.userService.registerUser(this.signUpForm.value).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
        this.signUpForm.reset();
        this.currentStep = 0;
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  signIn() {
    this.router.navigate(['/login']);
  }
}
