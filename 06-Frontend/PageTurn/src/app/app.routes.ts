import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { MyshelfComponent } from './pages/myshelf/myshelf.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path :'signup',component: SignUpComponent },
    {path: 'home', component:HomepageComponent},
    {path: 'books/:id', component:BookDetailsComponent},
    {path:'myshelf',component:MyshelfComponent},
    {path:'profile',component:ProfileComponent}
];
