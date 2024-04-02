import { Component } from '@angular/core';
import { UserService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

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

  logout() {
    localStorage.clear();
  }

  onEnterPressed(searchValue: string) {
    if (searchValue.trim() !== '') {
      const apiUrl = 'http://localhost:3000/api/books/search';
      const params = { q: searchValue };

      this.http.get(apiUrl, { params }).subscribe(
        (response: any) => {
          console.log('Search Result:', response);
          this.router.navigate(['/search'], {
            state: { searchData: response },
          });
        },
        (error) => {
          console.error('Error occurred while searching:', error);
        }
      );
    } else {
      console.log('Please enter a search term.');
    }
  }
}
