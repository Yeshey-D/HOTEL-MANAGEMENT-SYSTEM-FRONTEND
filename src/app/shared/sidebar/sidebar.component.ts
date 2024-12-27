import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent{
  
  @Output() logout = new EventEmitter<void>();

  constructor(
    private dialog: Dialog,
  ) {}
  
  onLogout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?'
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.logout.emit();
      }
    });
  }
}
