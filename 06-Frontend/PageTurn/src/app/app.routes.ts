import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path :'signup',component: SignUpComponent },
    {path: 'home', component:HomepageComponent},
    {path: 'books/:id', component:BookDetailsComponent}
];
