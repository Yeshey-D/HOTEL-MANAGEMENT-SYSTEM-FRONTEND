import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashboardContentComponent } from './admin/dashboard-content/dashboard-content.component';
import { ViewRoomComponent } from './admin/view-room/view-room.component';
import { AddRoomComponent } from './admin/add-room/add-room.component';
import { EditRoomComponent } from './admin/edit-room/edit-room.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    children: [
      {
        path: '',
        component: DashboardContentComponent,
      },

      {
        path: 'dashboard-content',
        component: DashboardContentComponent,
      },

      {
        path: 'view-room',
        component: ViewRoomComponent,
      },

      {
        path: 'add-room',
        component: AddRoomComponent,
      },

      // ... existing routes ...
      {
        path: 'edit-room/:id',
        component: EditRoomComponent,
      },
// ... existing routes ...
    ],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent }
];
