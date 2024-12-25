import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent, SidebarComponent],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  roomForm: FormGroup;
  loading = false;
  roomId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Get room ID from URL
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (this.roomId) {
      this.fetchRoomDetails(this.roomId);
    } else {
      this.toastr.error('Room ID not found');
      this.router.navigate(['/dashboard/view-room']);
    }
  }

  fetchRoomDetails(id: string) {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.apiService.get(`/rooms/${id}`, { headers }).subscribe({
      next: (room: any) => {
        this.roomForm.patchValue({
          name: room.name,
          type: room.type,
          price: room.price
        });
      },
      error: (error) => {
        console.error('Error fetching room:', error);
        this.toastr.error('Error fetching room details');
        this.router.navigate(['/dashboard/view-room']);
      }
    });
  }

  updateRoom() {
    if (this.roomForm.valid && this.roomId) {
      this.loading = true;
      
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      this.apiService.put(`/rooms/${this.roomId}`, this.roomForm.value, { headers })
        .subscribe({
          next: () => {
            this.loading = false;
            this.toastr.success('Room updated successfully');
            this.router.navigate(['/dashboard/view-room']);
          },
          error: (error) => {
            console.error('Error:', error);
            this.loading = false;
            this.toastr.error(error.message || 'Failed to update room');
          }
        });
    } else {
      this.toastr.error('Please fill all required fields');
    }
  }
}