import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-myshelf',
    standalone: true,
    templateUrl: './myshelf.component.html',
    styleUrl: './myshelf.component.css',
    imports: [NavbarComponent]
})
export class MyshelfComponent {

}
