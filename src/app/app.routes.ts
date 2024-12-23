import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashBoardComponent } from './dash-board/dash-board.component';


export const routes: Routes = [
    { path: '', component: LoginComponent }, // Default route
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashBoardComponent},


  ];
