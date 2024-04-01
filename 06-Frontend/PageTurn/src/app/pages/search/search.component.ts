import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [NavbarComponent,CommonModule]
})
export class SearchComponent {
    searchResults: any; // Assuming search results will be of any type

    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
        this.searchResults = history.state.searchData;
        console.log(this.searchResults);
      }
}
