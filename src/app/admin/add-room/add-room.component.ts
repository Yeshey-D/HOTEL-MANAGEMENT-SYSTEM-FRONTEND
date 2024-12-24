import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-room',
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  roomForm:FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ){
    this.roomForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      
      const token = localStorage.getItem('accessToken');
  
      const headers = {
        'Authorization':`Bearer ${token}`
      };
  
      this.apiService.post('/rooms', this.roomForm.value, { headers })
        .subscribe({
          next: () => {  // Removed unused 'response' parameter
            this.toastr.success('Room added successfully');
            this.router.navigate(['/dashboard/view-room']);
            
          },
          error: (error) => {
            console.error('Error:', error);
            this.toastr.error(error.message || 'Failed to add theatre');
          }
        });
    } else {
      this.toastr.error('Please fill all required fields correctly');
    }
  }
}

