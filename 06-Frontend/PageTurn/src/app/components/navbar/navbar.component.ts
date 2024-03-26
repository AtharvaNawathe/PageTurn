import { Component } from '@angular/core';
import { UserService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserDetails(token).subscribe(
        (response) => {
          this.username = response.username;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }
}
