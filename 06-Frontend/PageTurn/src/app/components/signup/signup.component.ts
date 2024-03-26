import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/register.service';
import countries from '../../constants/countries';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class SignUpComponent {
  countries: string[] = countries;
  signUpForm: FormGroup;
  currentStep: number = 0;
  steps: number[] = [0, 1, 2, 3];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
