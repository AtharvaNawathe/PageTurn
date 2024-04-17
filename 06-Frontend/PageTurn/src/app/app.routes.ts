import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { MyshelfComponent } from './pages/myshelf/myshelf.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './gaurds/authgaurd';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {path:"", component:LandingComponent},
    { path: 'login', component: LoginComponent },
    { path :'signup',component: SignUpComponent },
    { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
    {path: 'books/:id', component:BookDetailsComponent,canActivate: [AuthGuard]},
    {path:'myshelf',component:MyshelfComponent,canActivate: [AuthGuard]},
    {path:'profile',component:ProfileComponent ,canActivate: [AuthGuard]},
    {path:'search',component:SearchComponent,canActivate: [AuthGuard]},
    {path:'admin',component:AdminDashboardComponent,canActivate: [AuthGuard]},
    {path:'forgotPassword',component:ForgotPassComponent},
    { path: '**', component: NotfoundComponent },
];
