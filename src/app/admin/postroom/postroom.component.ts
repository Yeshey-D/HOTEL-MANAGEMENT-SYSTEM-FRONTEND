import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-postroom',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,NavbarComponent,SidebarComponent],
  templateUrl: './postroom.component.html',
  styleUrl: './postroom.component.css',
})
export class PostroomComponent {
  roomDetailsForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  submitform(){
    if (this.roomDetailsForm.valid) {
      this.loading = true;
      
      const token = localStorage.getItem('accessToken');
  
      const headers = {
        'Authorization': `Bearer ${token}`
      };
  
      this.apiService.post('/rooms', this.roomDetailsForm.value, { headers })
        .subscribe({
          next: () => { 
            this.loading = false;
            this.toastr.success('Room added successfully');
          },
          error: (error: { message: any; }) => {
            console.error('Error:', error);
            this.loading = false;
            this.toastr.error(error.message || 'Room not added!');
          }
        });
    } else {
      this.toastr.error('Enter all required fields!');
    }
  }
}
