import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {path: 'dashboard', component:DashBoardComponent},
];
