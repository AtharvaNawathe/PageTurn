import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [NavbarComponent,CommonModule]
})
export class ProfileComponent {
    userData: any;

    constructor(private authService: AuthService,) { }
  
    ngOnInit(): void {
      const token = this.authService.getToken();
      if (token) {
        this.authService.getUserDetails(token).subscribe(
          (response) => {
            console.log("Check books :",response);
            
            this.userData = response;
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
      }
    }
}
