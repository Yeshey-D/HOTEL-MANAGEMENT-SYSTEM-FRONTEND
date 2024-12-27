import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit {

  currentUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit() {
    if(this.authService.getRoles()!="ADMIN"){
      this.router.navigate(['user/dashboard']);
    }
  }

  handleLogout(): void {
    this.authService.logout();
    this.toastr.success('Logout successful', 'Success');
    this.router.navigate(['/login']);
  }
}
