import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  allUsers: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    const url = 'http://localhost:3000/api/users/all/users';
    const token = this.authService.getToken(); // Assuming getToken method exists in AuthService

    // Check if token exists
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `${token}`
      });

      this.http.get<any[]>(url, { headers }).subscribe(
        (response) => {
          this.allUsers = response;
          console.log(this.allUsers);
          this.generatePieChart();
        },
        (error) => {
          console.error('Error fetching all users:', error);
        }
      );
    } else {
      console.error('JWT token not found.');
    }
  }

  generatePieChart(): void {
    let dataPoints = [];

    // Count male and female users
    let maleCount = this.allUsers.filter(user => user.gender === 'male').length;
    let femaleCount = this.allUsers.filter(user => user.gender === 'female').length;

    // Add data points to array
    dataPoints.push({ y: maleCount, name: "Male" });
    dataPoints.push({ y: femaleCount, name: "Female" });

    // Generate chart options
    let chartOptions = {
      animationEnabled: true,
      theme: "dark2",
      title: {
        text: "Gender Distribution"
      },
      data: [{
        type: "pie",
        startAngle: 45,
        indexLabel: "{name}: {y}",
        indexLabelPlacement: "inside",
        yValueFormatString: "#,###.##'%'",
        dataPoints: dataPoints
      }]
    };

    // Render chart
    let chart = new CanvasJS.Chart("chartContainer", chartOptions);
    chart.render();
  }
}
